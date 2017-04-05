'use strict';

// Reedpay.DEFAULT_HOST = 'localhost';
// Reedpay.DEFAULT_PORT = '80';
Reedpay.DEFAULT_HOST = 'xpay-alpha01.reedsec.com';
Reedpay.DEFAULT_PORT = '443';
Reedpay.DEFAULT_BASE_PATH = '/secapi/v1';
Reedpay.DEFAULT_API_VERSION = '1.0.0';
Reedpay.DEFAULT_SIGN_TYPE = 'MD5';

Reedpay.DEFAULT_TIMEOUT = require('http').createServer().timeout;

Reedpay.PACKAGE_VERSION = require('../package.json').version;

Reedpay.USER_AGENT = {
	binding_version: Reedpay.PACKAGE_VERSION,
	lang: 'node',
	lang_version: process.version,
	platform: process.platform,
	publisher: 'reedsec',
	uname: null
};

Reedpay.USER_AGENT_SERIALIZED = null;

var exec = require('child_process').exec;

var resources = {
	Sale: require('./resources/Sale'),
	Refund: require('./resources/Refund'),
	Redpack: require('./resources/Redpack'),
	Notification: require('./resources/Notification'),
	Transfer: require('./resources/Transfer')
};

var weixinOauth = require('./WeixinOauth');
var _ = require('lodash');
var HEADERS_TO_PARSE = [ 'Reedpay-Sdk-Version' ];
var fs = require('fs');

Reedpay.ReedpayResource = require('./ReedpayResource');
Reedpay.resources = resources;
Reedpay.weixinOauth = weixinOauth;

function Reedpay(key, version) {
	if (!(this instanceof Reedpay)) {
		return new Reedpay(key, version);
	}

	this._api = {
		auth: null,
		host: Reedpay.DEFAULT_HOST,
		port: Reedpay.DEFAULT_PORT,
		basePath: Reedpay.DEFAULT_BASE_PATH,
		version: Reedpay.DEFAULT_API_VERSION,
		timeout: Reedpay.DEFAULT_TIMEOUT,
		signType: Reedpay.DEFAULT_SIGN_TYPE,
		dev: false
	};

	this._parsedHeaders = {};
	this._privateKey = null;
	this._publicKey = null;
	this._secretKey = null;

	this._prepareResources();
	this._prepareExtraFuncs();
	this.setApiKey(key);
	this.setApiVersion(version);
}

Reedpay.prototype = {

	setHost: function(host, port, protocol) {
		this._setApiField('host', host);
		if (port) this.setPort(port);
		if (protocol) this.setProtocol(protocol);
	},

	setProtocol: function(protocol) {
		this._setApiField('protocol', protocol.toLowerCase());
	},

	setPort: function(port) {
		this._setApiField('port', port);
	},

	setApiVersion: function(version) {
		if (version) {
			this._setApiField('version', version);
		}
	},

	setApiKey: function(key) {
		if (key) {
			this._setApiField(
				'auth',
				'Basic ' + new Buffer(key + ':').toString('base64')
			);
		}
	},

	setTimeout: function(timeout) {
		this._setApiField(
			'timeout',
			timeout == null ? Reedpay.DEFAULT_TIMEOUT : timeout
		);
	},

	_setApiField: function(key, value) {
		this._api[key] = value;
	},

	getApiField: function(key) {
		return this._api[key];
	},

	getConstant: function(c) {
		return Reedpay[c];
	},

	getClientUserAgent: function(callback) {
		if (Reedpay.USER_AGENT_SERIALIZED) {
			return callback(Reedpay.USER_AGENT_SERIALIZED);
		}

		exec('uname -a', function(err, uname) {
			Reedpay.USER_AGENT.uname = uname || 'UNKNOWN';
			Reedpay.USER_AGENT_SERIALIZED = JSON.stringify(Reedpay.USER_AGENT);
			callback(Reedpay.USER_AGENT_SERIALIZED);
		});
	},

	setPrivateKey: function(privateKey) {
		this._privateKey = privateKey;
	},

	getPrivateKey: function() {
		return this._privateKey;
	},

	setPrivateKeyPath: function(path) {
		this._privateKey = fs.readFileSync(path, 'utf8');
	},

	setPublicKey: function(privateKey) {
		this._publicKey = publicKey;
	},

	getPublicKey: function() {
		return this._publicKey;
	},

	setPublicKeyPath: function(path) {
		this._publicKey = fs.readFileSync(path, 'utf8');
	},

	setSecretKey: function(secretKey) {
		this._secretKey = secretKey;
	},

	getSecretKey: function(secretKey) {
		return this._secretKey;
	},

	_prepareResources: function() {
		for (var name in resources) {
			this[
				name[0].toLowerCase() + name.substring(1)
			] = new resources[name](this);
		}
	},

	_setParsedHeader: function(key, value) {
		this._parsedHeaders[key] = value;
	},

	getParsedHeaders: function() {
		return this._parsedHeaders;
	},

	_prepareExtraFuncs: function() {
		var self = this;
		this['weixinOauth'] = weixinOauth;
		this['parsedHeaders'] = function (headers) {
			if (typeof headers == 'undefined') {
				return;
			}
			for (var k in headers) {
				var key = _.startCase(k.toLowerCase()).replace(/\s/g, '-');
				if (_.indexOf(HEADERS_TO_PARSE, key) != -1) {
					self._setParsedHeader(key, headers[k]);
				}
			}
		};
	}
};

module.exports = Reedpay;