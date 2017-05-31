'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

module.exports = ReedpayResource.extend({

	path: 'balance',
	
	query: reedpayMethod({
		method: 'GET',

		params: [
			'app_id:string(32)',
			'channel:string(40)',
			'optional!fund_type:string(40)',
			'optional!timestamp:timestamp'
		]
	})

});
