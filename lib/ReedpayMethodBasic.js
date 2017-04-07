'use strict';

var reedpayMethod = require('./ReedpayMethod');
var utils = require('./utils');

module.exports = {
	
	create: reedpayMethod({
		method: 'POST',
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