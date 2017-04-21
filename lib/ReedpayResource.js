'use strict';

var http  = require('http');
var https = require('https');
var path  = require('path');
var when  = require('when');
var _     = require('lodash');

var utils = require('./utils');
var Error = require('./Error');

const MANDATORY_REGEX = /(\w[\w\_]+)\:(string|int|float|boolean|timestamp|datetime|object|array)(?:\((\d+)\))?/;
const OPTIONAL_REGEX = /^optional!(\w[\w\_]+)\:(string|int|float|boolean|timestamp|datetime|object|array)(?:\((\d+)\))?/;
const EITHER_REGEX = /^either!\[(\w[\w\_\:\(\)]+(?:\|\w[\w\_\:\(\)]+)*)\]/;

var hasOwn = {}.hasOwnProperty;

// Provide extension mechanism for Reedpay Resource Sub-Classes
ReedpayResource.extend = utils.protoExtend;

// Expose method-create & prepared (basic) methods
ReedpayResource.method = require('./ReedpayMethod');
ReedpayResource.basicMethods = require('./ReedpayMethodBasic');

/**
 * Encapsulates request logic for a Reedpay Resource
 */
function ReedpayResource(reedpay, urlData) {
	this._reedpay = reedpay;
	this._urlData = urlData || {};

	this.basePath = utils.makeURLInterpolator(reedpay.getApiField('basePath'));
	this.path = utils.makeURLInterpolator(this.path);

	if (this.includeBasic) {
		this.includeBasic.forEach(function (methodName) {
			this[methodName] = ReedpayResource.basicMethods[methodName];
		}, this);
	}

	this.initialize.apply(this, arguments);
}

ReedpayResource.prototype = {

	path: '',

	initialize: function() {},

	createFullPath: function(commandPath, urlData) {
		return path.join(
			this.basePath(urlData),
			this.path(urlData),
			typeof(commandPath) == 'function' ? commandPath(urlData) : commandPath
		).replace(/\\/g, '/'); // ugly workaround for Windows
	},

	createUrlData: function(callback) {
		var urlData = {};
		for (var i in this._urlData) {
			if (hasOwn.call(this._urlData, i)) {
				urlData[i] = this._urlData[i];
			}
		}
		return urlData;
	},

	createDeferred: function(callback) {
		var deferred = when.defer();

		if (callback) {
			// Callback, if provided, is a simply translated to Promise
			// (Ensure callback is called outside of promise stack)
			deferred.promise
			.then(function(res) {
				setTimeout(function() {
					callback(null, res);
				}, 0);
			}, function(err) {
				setTimeout(function() {
					callback(err, null);
				}, 0);
			});
		}

		return deferred;
	},

	makeRequestData: function(data, params, jsonParams) {
		const reqData = {};
		for (let i = 0; i < params.length; ++i) {
			let m = null;
			if (OPTIONAL_REGEX.test(params[i])) {
				m = params[i].match(OPTIONAL_REGEX);
			}
			else if (MANDATORY_REGEX.test(params[i])) {
				m = params[i].match(MANDATORY_REGEX);
			}
			
			if (m) {
				let name = m[1];
				let type = m[2];
				let length = m[3] ? parseInt(m[3]) : 0;
				if (data.hasOwnProperty(name)) {
					if (type == 'string' && Buffer.byteLength(data[name]) > length) {
						throw new Error.ReedpayError({
							message: 'ReedpayError: argument length exceeds limit: ' + name,
							param: [ name ]
						});
					}
					else {
						reqData[name] = data[name];
						this._transformToRequestData(reqData, name, type, jsonParams);
					}
				}
			}
		}
		return reqData;
	},

	_transformToRequestData: function(data, name, type, jsonParams) {
		const self = this;
		switch (type) {
			case 'boolean':
				data[name] = (data[name] == true 
					|| data[name] > 0
					|| data[name] == 'true') ? true : false;
				break;
			case 'timestamp':
				data[name] = _.isDate(data[name]) ? Math.round(data[name].getTime() / 1000) : null;
				break;
			case 'datetime':
				data[name] = _.isDate(data[name]) ? utils.formatDate(data[name], 'yyyyMMddHHmmss') : null;
				break;
			case 'object':
			case 'array':
				data[name] = JSON.stringify(data[name]);
				break;
		}
	},

	_timeoutHandler: function(timeout, req, callback) {
		var self = this;
		return function() {
			var timeoutError = new Error('ETIMEOUT');
			timeoutError.code = 'ETIMEOUT';

			req._isAborted = true;
			req.abort();

			callback.call(
				self,
				new Error.ReedpayConnectionError({
					message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
					detail: timeoutError
				}),
				null
			);
		}
	},

	_responseHandler: function(req, callback) {
		var self = this;
		return function(res) {
			var response = '';

			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				response += chunk;
			});
			res.on('end', function() {
				try {
					response = JSON.parse(response);
					if (response.error) {
						var err;
						if (res.statusCode === 401) {
							err = new Error.ReedpayAuthenticationError(response.error);
						}
						else {
							err = Error.ReedpayError.generate(response.error);
						}
						return callback.call(self, err, null);
					}
				}
				catch (e) {
					return callback.call(
						self,
						new Error.ReedpayApiError({
							message: 'Invalid JSON received from Reedpay Api',
							response: response,
							exception: e
						}),
						null
					);
				}
				callback.call(self, null, response);
			});
		};
	},

	_errorHandler: function(req, callback) {
		var self = this;
		return function(error) {
			if (req._isAborted) return; // already handled
			callback.call(
				self,
				new Error.ReedpayConnectionError({
					message: 'An error occurred when connecting to Reedpay',
					detail: error.message
				}),
				null
			);
		};
	},

	_request: function(method, path, data, auth, callback) {

		var self = this;
		var requestData = null;
		// Set header meta
		var apiVersion = this._reedpay.getApiField('version');
		var headers = {
			'Authorization': auth ?
				'Basic ' + new Buffer(auth + ':').toString('base64') :
				this._reedpay.getApiField('auth'),
			'Accept': 'application/json',
			'Content-Type': method == 'POST' ? 'application/json' : 'application/x-www-form-urlencoded',
			'User-Agent': 'Reedpay/v2 NodeBindings/' + this._reedpay.getConstant('PACKAGE_VERSION')
		};

		if (apiVersion) {
			headers['Reedpay-Version'] = apiVersion;
		}
		headers = _.assign(headers, this._reedpay.getParsedHeaders());

		// Sign if POST or PUT
		let sign = null;
		if ((method == 'POST' || method == 'PUT') && data) {
			const toSign = utils.sortAndStringifyData(data);
			switch (this._reedpay.getApiField('signType')) {
				case 'SHA1':
					sign = utils.signSHA1WithRSA(
						toSign,
						this._reedpay.getPrivateKey()
					);
					break;
				case 'SHA256':
					sign = utils.signSHA256WithRSA(
						toSign,
						this._reedpay.getPrivateKey()
					);
					break;
				case 'MD5':
				default:
					sign = utils.signWithMD5(
						toSign,
						this._reedpay.getSecretKey(),
						false,
						false
					);
					break;
			}
		}

		// Update request data if signed
		if (sign) {
			data.sign_type = this._reedpay.getApiField('signType');
			data.sign = sign;
		}

		requestData = (method == 'POST') ? JSON.stringify(data || {})
											: utils.stringifyRequestData(data || {});

		if ((method == 'GET' || method == 'DELETE') && requestData != '') {
			path = path + '?' + requestData;
			requestData = '';
		}

		this._reedpay.getClientUserAgent(function(cua) {
			headers['X-Reedpay-Client-User-Agent'] = cua;
			makeRequest();
		});

		function makeRequest() {
			var timeout = self._reedpay.getApiField('timeout');
			var isInsecureConnection = self._reedpay.getApiField('protocol') == 'http';

			var req = (
				isInsecureConnection ? http : https
			).request({
				host: self._reedpay.getApiField('host'),
				port: self._reedpay.getApiField('port'),
				path: path,
				method: method,
				headers: headers,
				ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
				secureProtocol: 'TLSv1_method'
			});

			req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
			req.on('response', self._responseHandler(req, callback));
			req.on('error', self._errorHandler(req, callback));

			req.on('socket', function(socket) {
				socket.on(isInsecureConnection ? 'connect' : 'secureConnect', function() {
					req.write(requestData);
					req.end();
				});
			});
		}
	}

};

module.exports = ReedpayResource;