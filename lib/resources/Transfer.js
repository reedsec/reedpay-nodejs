'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

module.exports = ReedpayResource.extend({

	path: 'transfer',

	create: reedpayMethod({
		method: 'POST',

		params: [
			'optional!timestamp:timestamp',
			'sign_type:10',
			'sign:1024',
			'app_id:string(32)',
			'either![mch_order_no:string(32)|mch_batch_no:string(32)]',
			'description:string(128)',
			'amount:int', 
			'trade_type:string(40)',  // WX_PAY2USER - 微信支付企业转账, 
																// TR_ACCOUNT - 单笔代付到账号 , TR_BANKCARD - 单笔代付到银行卡
																// TRB_ACCOUNT - 批量代付到账号 , TRB_BANKCARD - 批量代付到银行卡
			'optional!channel:string(40)',
			'optional!pay_mode:string(40)', // BALANCE - 余额支付（默认）, EBANK - 企业网银, LOAN - 垫资支付
			'optional!payee_check:string(16)', // NON - 不校验收款人, CHECK - 强校验收款人
			'optional!currency:string(3)',
			'optional!business_type:string(16)',// BUSINESS - 业务往来款（默认）, SALARY - 员工工资, REIMBURSE - 报销
																					// CONTRACT - 合作款项, PREMIUM - 赔付保金, OTHERS - 其他
			
			'extra:object',
			'optional!batch_count:int',
			'optional!batch:array'
		],
		
		jsonParams: {
			extra: [
				'client_ip:string(16)',

				'optional!payee_mobile:string(16)',
				'optional!payee_name:string(128)', // 收款人姓名
				'optional!payee_account_id:string(128)', // 收款人平台账号/银行账号
				'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
				'optional!bank_name:string(40)',
				'optional!bank_branch_code:string(12)',
				'optional!bank_branch_name:string(100)',
				'optional!remark:string(100)'
			],

			batch: [
				'sub_amount:int',
				'sub_order_no::string(32)',
				'optional!payee_mobile:string(11)',
				'optional!payee_name:string(128)', // 收款人姓名
				'optional!payee_account_id:string(128)', // 收款人平台账号/银行账号
				'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
				'optional!bank_name:string(40)',
				'optional!bank_branch_code:string(12)',
				'optional!bank_branch_name:string(100)',
				'optional!remark:string(100)'
			]
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

});
