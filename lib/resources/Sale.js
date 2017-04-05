'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

module.exports = ReedpayResource.extend({
	path: 'sale',

	includeBasic: [
		'create', 'pay', 'query', 'retrieve'
	],

	/**
	 * Payment: Refund method
	 */
	createRefund: reedpayMethod({
		method: 'POST',
		path: '/{payId}/refund',
		urlParams: ['payId']
	}),

	queryRefund: reedpayMethod({
		method: 'GET',
		path: '/{payId}/refund/{refundId}',
		urlParams: [ 'payId', 'refundId' ]

	}),

	retrieveRefunds: reedpayMethod({
		method: 'GET',
		path: '/{payId}/refund',
		urlParams: [ 'payId' ]
	})
});