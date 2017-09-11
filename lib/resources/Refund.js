'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

/**
 * PaymentRefund is a unique resource in that, upon instantiation,
 * requires a paymentId, and therefore each of its methods only
 * require the refundId argument.
 *
 * This streamlines the API specifically for the case of accessing refunds
 * on a returned payment object.
 *
 * E.g. paymentObject.refund.query(refundId)
 * (As opposed to the also-supported reedpay.Payment.queryRefund(paymentId, refundId) )
 */
module.exports = ReedpayResource.extend({
	path: 'sale',

	create: reedpayMethod({
		method: 'POST',
		path: '/{payId}/refund',
		urlParams: ['payId'],

		params: [
			'app_id:string(32)',
			'transaction_id:string(64)',
			'refund_amount:int', 
			'description:string(256)',
			'optional!timestamp:timestamp',
			'optional!mch_extra:object'
		],
	}),

	query: reedpayMethod({
		method: 'GET',
		path: '/{payId}/refund/{refundId}',
		urlParams: [ 'payId', 'refundId' ],

		params: [
			'transaction_id:string(32)',
			'refund_id:string(32)',
			'optional!timestamp:timestamp'
		]
	}),

	retrieve: reedpayMethod({
		method: 'GET',
		path: '/{payId}/refund',
		urlParams: [ 'payId' ],

		params: [
			'optional!page:int',
			'optional!page_size:int',
			'optional!app_id:string(32)',
			'optional!branch_id:string(40)', 
			'optional!trade_type:string(40)',
			'optional!refund_status:string(40)',
			'optional!time_created:object',
			'optional!amount:object',
			'optional!timestamp:timestamp'
		],

		jsonParams: {
			time_created: [
				'optional!eq:datetime',
				'optional!gt:datetime',
				'optional!gte:datetime',
				'optional!lt:datetime',
				'optional!lte:datetime'
			],

			amount: [
				'optional!eq:int',
				'optional!gt:int',
				'optional!gte:int',
				'optional!lt:int',
				'optional!lte:int'
			]
		}
	})
});
