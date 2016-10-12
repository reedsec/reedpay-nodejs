'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

module.exports = ReedpayResource.extend({
	path: 'payment',

	includeBasic: [
		'create', 'query', 'retrieve'
	],

	/**
	 * Payment: Refund method
	 */
	createRefund: reedpayMethod({
		method: 'POST',
		path: '/{paymentId}/refund',
		urlParams: ['paymentId']
	}),

	queryRefunds: reedpayMethod({
		method: 'GET',
		path: '/{paymentId}/refund',
		urlParams: [ 'paymentId', 'refundId' ]
	}),

	retrieveRefund: reedpayMethod({
		method: 'GET',
		path: '/{paymentId}/refund/{refundId}'
		urlParams: [ 'paymentId' ]
	})
});