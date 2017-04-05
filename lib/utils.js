'use strict';

var qs = require('qs');
var _  = require('lodash');
var crypto = require('crypto');

var hasOwn = {}.hasOwnProperty;
var toString = {}.toString;

var utils = module.exports = {

	isAuthKey: function(key) {
		return typeof key == 'string' && /^\w{2}\_([0-9A-z]+){33}$/.test(key);
	},

	isObject: function(o) {
		return toString.call(o) === '[object Object]';
	},

	/**
	 * Stringifies an Object, accommodating a single-level of nested objects
	 * (forming the conventional key "parent[child]=value")
	 */
	stringifyRequestData: function(data, _key) {
		if (data.expand) {
			data = _.cloneDeep(data);
			data['expand[]'] = data.expand;
			delete data.expand;
		}
		return qs.stringify(data, { indices: false });
	},

	/**
	 * https://gist.github.com/padolsey/6008842
	 * Outputs a new function with interpolated object property values.
	 * Use like so:
	 *   var fn = makeURLInterpolator('some/url/{param1}/{param2}');
	 *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
	 */
	makeURLInterpolator: (function() {
		var rc = {
			'\n': '\\n', '\"': '\\\"',
			'\u2028': '\\u2028', '\u2029': '\\u2029'
		};
		return function makeURLInterpolator(str) {
			return new Function(
				'o',
				'return "' + (
					str.replace(/["\n\r\u2028\u2029]/g, function($0) {
						return rc[$0];
					})
					.replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "')
				) + '";'
			);
		};
	}()),

	/**
	 * Provide simple "Class" extension mechanism
	 */
	protoExtend: function(sub) {
		var Super = this;
		var Constructor = hasOwn.call(sub, 'constructor') ? sub.constructor : function() {
			Super.apply(this, arguments);
		};
		Constructor.prototype = Object.create(Super.prototype);
		for (var i in sub) {
			if (hasOwn.call(sub, i)) {
				Constructor.prototype[i] = sub[i];
			}
		}
		for (i in Super) {
			if (hasOwn.call(Super, i)) {
				Constructor[i] = Super[i];
			}
		}
		return Constructor;
	},

	sortAndStringifyData: function(data, filter) {
		let filtered;
		if (_.isArray(filter) && filter.length > 0) {
			filtered = _.omit(data, filter);
		}
		else {
			filtered = data;
		}

		let str = '';
		Object.keys(filtered).sort().forEach(function(key) {
			if (_.isNumber(filtered[key]) || !_.isEmpty(filtered[key])) {
				str += key + '=' + filtered[key] + '&';
			}
		});
		return str.substr(0, str.length - 1);
	},

	signWithMD5: function(data, secret, withKey, uppercase) {
		let toSign = '';
		if (secret && withKey) {
			toSign = data + '&key=' + secret;
		}
		else if (secret) {
			toSign = data + secret;
		}
		else {
			toSign = data;
		}

		const signature = crypto.createHash('md5')
														.update(toSign, 'utf8')
														.digest('hex');
		return uppercase ? signature.toUpperCase() : signature;
	},

	verifyWithMD5: function(signed, data, secret, withKey, uppercase) {
		const signature = this.signWithMD5(data, secret, withKey, uppercase);
		return signature == signed;
	},

	signSHA1WithRSA: function(data, privateKey) {
		const sign = crypto.createSign('RSA-SHA1').update(data, 'utf8');
		return sign.sign(privateKey, 'base64');
	},

	verifySHA1WithRSA: function(signed, signature, publicKey) {
		const verify = crypto.createVerify('RSA-SHA1').update(signed);
		return verify.verify(publicKey, signature, 'base64');
	},

	signSHA256WithRSA: function(data, privateKey) {
		const sign = crypto.createSign('RSA-SHA256').update(data, 'utf8');
		return sign.sign(privateKey, 'base64');
	},

	verifySHA256WithRSA: function(signed, signature, publicKey) {
		const verify = crypto.createVerify('RSA-SHA256').update(signed);
		return verify.verify(publicKey, signature, 'base64');
	},

};