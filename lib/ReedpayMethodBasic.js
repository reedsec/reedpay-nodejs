'use strict';

var reedpayMethod = require('./ReedpayMethod');
var utils = require('./utils');

module.exports = {
	
	create: reedpayMethod({
		method: 'POST',
	}),

	pay: reedpayMethod({
		method: 'POST',
		path: '/directdebit'
	}),

	query: reedpayMethod({
		method: 'GET',
		path: '/{id}',
		urlParams: [ 'id' ]
	}),

	retrieve: reedpayMethod({
		method: 'GET',
	}),
	
};