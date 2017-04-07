'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

module.exports = ReedpayResource.extend({
	path: 'sale',

	create: reedpayMethod({
		method: 'POST',

		params: [
			'optional!timestamp:timestamp',
			'sign_type:10',
			'sign:1024',
			'either![app_id:string(32)|branch_id:string(40)]',
			'mch_order_no:string(64)',
			'amount:int', 
			'trade_type:string(40)',
			'subject:string(256)', 
			'extra:object',
			'optional!currency:string(3)',
			'optional!detail:string(1024)', 
			'optional!time_expire:datetime',
			'optional!mch_extra:object'
		],
		
		jsonParams: {
			extra: [
				'client_ip:string(16)',
				'optional!auth_code:string(128)',

				/**
			 	 * Alipay
			 	 */
				'optional!app_auth_token:string(40)',
				'optional!show_url:string(256)',
				
				/**
				 * Wxpay
				 */
				'optional!limit_pay:string(32)',
				'optional!openid:string(128)',
				'optional!sub_openid:string(128)'
			],
		}
	}),

	query: reedpayMethod({
		method: 'GET',
		path: '/{id}',
		urlParams: [ 'id' ],

		params: [
			'transaction_id:string(32)',
			'optional!timestamp:timestamp'
		]
	}),

	retrieve: reedpayMethod({
		method: 'GET',

		params: [
			'optional!page:int',
			'optional!page_size:int',
			'optional!app_id:string(32)',
			'optional!branch_id:string(40)', 
			'optional!trade_type:string(40)',
			'optional!trade_status:string(40)',
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
	}),

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