'use strict';

var ReedpayResource = require('../ReedpayResource');
var reedpayMethod = ReedpayResource.method;

module.exports = ReedpayResource.extend({

	path: 'redpack',

	includeBasic: [
		'create', 'query', 'retrieve'
	]

});
