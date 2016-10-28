'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

module.exports = ReedpayResource.extend({
	path: 'purchase',

	includeBasic: [
		'create', 'pay', 'query', 'retrieve'
	],

	/**
	 * Payment: Refund method
	 */
	createRefund: reedpayMethod({
		method: 'POST',
		path: '/{paymentId}/refund',
		urlParams: ['paymentId']
	}),

	queryRefund: reedpayMethod({
		method: 'GET',
		path: '/{paymentId}/refund/{refundId}',
		urlParams: [ 'paymentId', 'refundId' ]

	}),

	retrieveRefunds: reedpayMethod({
		method: 'GET',
		path: '/{paymentId}/refund',
		urlParams: [ 'paymentId' ]
	})
});