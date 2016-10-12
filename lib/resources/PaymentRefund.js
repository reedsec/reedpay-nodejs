'use strict';

var ReedpayResource = require('../ReedpayResource');

/**
 * PaymentRefund is a unique resource in that, upon instantiation,
 * requires a paymentId, and therefore each of its methods only
 * require the refundId argument.
 *
 * This streamlines the API specifically for the case of accessing refunds
 * on a returned payment object.
 *
 * E.g. paymentObject.refund.retrieve(refundId)
 * (As opposed to the also-supported reedpay.Payment.retrieveRefund(paymentId, refundId) )
 */
module.exports = ReedpayResource.extend({
	path: 'payment/{paymentId}/refund',
	includeBasic: [ 'create', 'query', 'retrieve' ]
});
