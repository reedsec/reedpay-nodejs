'use strict';

var path = require('path');
var utils = require('./utils');
var OPTIONAL_REGEX = /^optional!/;

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, 
 * joined with the instance's path (e.g. "payment")
 * @param [spec.required=[]] Array of required arguments in the order that 
 * they must be passed by the consumer of the API. Subsequent optional 
 * arguments are optionally passed through a hash (Object) as the penultimate 
 * argument preceeding the also-optional callback argument
 */
module.exports = function reedpayMethod(spec) {
	var commandPath = typeof(spec.path) == 'function' ? spec.path
											: utils.makeURLInterpolator(spec.path || '');
	var requestMethod = (spec.method || 'GET').toUpperCase();
	var urlParams = spec.urlParams || [];
	var params = spec.params;
	var jsonParams = spec.jsonParams;

	return function() {
		var self = this;
		var args = [].slice.call(arguments);

		var callback = typeof(args[args.length - 1]) == 'function' && args.pop();
		var auth = args.length > urlParams.length && utils.isAuthKey(args[args.length - 1]) ? args.pop() : null;
		var data = utils.isObject(args[args.length - 1]) ? args.pop() : {};
		var reqData = this.makeRequestData(data, params, jsonParams);
		var urlData = this.createUrlData();
		
		var deferred = this.createDeferred(callback);

		for (var i = 0, l = urlParams.length; i < l; ++i) {
			var arg = args[0];
			var param = urlParams[i];

			var isOptional = OPTIONAL_REGEX.test(param);
			param = param.replace(OPTIONAL_REGEX, '');

			if (!arg) {
				if (isOptional) {
					urlData[param] = '';
					continue;
				}
				throw new Error('Reedpay: requires argument "' + urlParams[i] + '", but got: ' + arg);
			}

			urlData[param] = args.shift();
		}

		if (args.length) {
			throw new Error('Reedpay: Unknown arguments (' + args + '). Need an option object');
		}

		var requestPath = this.createFullPath(commandPath, urlData);
		// console.log('requestPath: ', requestPath);
		self._request(requestMethod, requestPath, reqData, auth, function(err, res) {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(
					spec.transformResponseData ? spec.transformResponseData(res) : res
				);
			}
		});

		return deferred.promise;
	};
};