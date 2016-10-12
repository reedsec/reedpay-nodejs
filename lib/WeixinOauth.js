'use strict';

var https  = require('https');
var utils  = require('./utils');
var crypto = require('crypto');
var Error  = require('./Error');

var WeixinOauth = module.exports = {
	getOpenid: function(wxAppId, wxAppSecret, code, callback) {
		var path = WeixinOauth._createOauthPathForOpenid(wxAppId, wxAppSecret, code);
		WeixinOauth._getRequest('api.weixin.qq.com', path, function(err, res) {
			if (err) {
				return callback(err, null, res);
			}
			if (res && res.hasOwnProperty('openid')) {
				return callback(null, res['openid'], res);
			}
			else {
				return callback(new Error('OpenidNotReceived', 'JSON received from the Weixin does not contain openid'), null, res);
			}
		});
	},

	createOauthUrlForCode: function(wxAppId, redirectUri, moreInfo) {
		moreInfo = typeof(moreInfo) == 'undefined' ? false : moreInfo;
		var queryParts = {
			'appid': wxAppId,
			'redirect_uri': redirectUri,
			'response_type': 'code',
			'scope': moreInfo ? 'snsapi_userinfo' : 'snsapi_base'
		};
		var queryStr = utils.stringifyRequestData(queryParts);
		return 'https://open.weixin.qq.com/connect/oauth2/authorize?' + queryStr + '#wechat_redirect';
	},

	_getRequest: function(host, path, callback) {
		var req = https.request({
			host: host,
			port: 443,
			path: path,
			method: 'GET',
			secureProtocol: 'TLSv1_method'
		}, function(res) {
			var response = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				response += chunk;
			});
			res.on('end', function() {
				try {
					var responseJson = JSON.parse(response);
					return callback(null, responseJson);
				}
				catch (err) {
					return callback(new Error('JSONParseFailed', 'Invalid JSON received from Weixin'), response);
				}
			});
		});

		req.end();

		var timeout = 30000;
		req.setTimout(timeout, function() {
			req._isAborted = true;
			req.abort();
			return callback(new Error('CONNECTION_TIMEOUT', 'Request aborted due to timeout being reached (' + timeout + 'ms'), null);
		});
		req.on('error', function(err) {
			if (req._isAborted) return;
			return callback(new Error('CONNECTION_ERROR', 'An error occurred when connecting to Weixin'), null);
		});
	},

	_createOauthPathForOpenid: function(wxAppId, wxAppSecret, code) {
		var queryParts = {
			'appid': wxAppId,
			'secret': wxAppSecret,
			'code': code,
			'grant_type': 'authorization_code'
		};
		var queryStr = utils.stringifyRequestData(queryParts);
		return '/sns/oauth2/access_token?' + queryStr;
	},

	getJsapiTicket: function(wxAppId, wxAppSecret, callback) {
		var queryParts = {
			'appid': wxAppId,
			'secret': wxAppSecret,
			'grant_type': 'client_credential'
		};
		var queryStr = utils.stringifyRequestData(queryParts);
		var accessTokenPath = '/cgi-bin/token?' + queryStr;
		WeixinOauth._getRequest('api.weixin.qq.com', accessTokenPath, function(err, res) {
			if (err) {
				return callback(err, res);
			}
			if (res && res.hasOwnProperty('errcode')) {
				return callback(null, res);
			}
			var queryParts = {
				'access_token': response['access_token'],
				'type': 'jsapi'
			};
			var queryStr = utils.stringifyRequestData(queryParts);
			var jsapiTicketPath = '/cgi-bin/ticket/getticket?' + queryStr;
			WeixinOauth._getRequest('api.weixin.qq.com', jsapiTicketPath, function(err, res) {
				return callback(err, res);
			});
		});
	},

	getSignature: function(payment, jsapiTicket, url) {
		if (!payment.hasOwnProperty('credential') || !payment['credential'].hasOwnProperty('wx_jsapi')) {
			return null;
		}
		var credential = payment['credential']['wx_jsapi'];
		var arrayToSign = [
			'jsapi_ticket=' + jsapiTicket,
			'noncestr=' + credential['nonceStr'],
			'timestamp=' + credential['timeStamp'],
			'url=' + url.split('#')[0]
		];
		return crypto.createHash('sha1').update(arrayToSign.join('&')).digest('hex');
	}
};