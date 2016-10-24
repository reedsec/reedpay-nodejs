'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error class to wrap any erros returned by reedpay-node
 */
function _Error(raw) {
	this.populate.apply(this, arguments);
	this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GENERIC_ERROR';
_Error.prototype.populate = function(type, message) {
	this.type = type;
	this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error class
 * (Specifically for errors returned from Reedpay's REST API)
 */
var ReedpayError = _Error.ReedpayError = _Error.extend({
	type: 'REEDPAY_ERROR',
	populate: function(raw) {
		// Move from prototype def (so it appears in stringified obj)
		this.type = this.type;

		this.stack = (new Error(raw.message)).stack;
		this.rawType = raw.type;
		this.code = raw.code;
		this.param = raw.param;
		this.message = raw.message;
		this.detail = raw.detail;
		this.raw = raw;
	}
});

/**
 * Helper factory which takes raw reedpay errors and outputs wrapping instances
 */
ReedpayError.generate = function(rawReedpayError) {
	switch (rawReedpayError.type) {
		case 'invalid_request_error':
			return new _Error.ReedpayInvalidRequestError(rawReedpayError);
		case 'api_error':
			return new _Error.ReedpayApiError(rawReedpayError);
		case 'channel_error':
			return new _Error.ReedpayChannelError(rawReedpayError);
	}

	return new _Error('GENERIC_ERROR', 'Unknown Error');
};

// Specific Reedpay Error types:
_Error.ReedpayInvalidRequestError = ReedpayError.extend({ type: 'REEDPAY_INVALID_REQUEST'});
_Error.ReedpayApiError = ReedpayError.extend({ type: 'REEDPAY_API_ERROR' });
_Error.ReedpayAuthenticationError = ReedpayError.extend({ type: 'REEDPAY_AUTHENTICATION_ERROR' });
_Error.ReedpayConnectionError = ReedpayError.extend({ type: 'REEDPAY_CONNECTION_ERROR' });
_Error.ReedpayChannelError = ReedpayError.extend({ type: 'REEDPAY_CHANNEL_ERROR' });