'use strict';

const API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC";
const APP_ID = "app_57ede786d4d7a81549645e56";
const reedpay = require('../lib/reedpay')(API_KEY);

reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');

const channel = 'ali_qr';
// const channel = 'ali_qraaaaaaaaaaaaaaa';

let channel_extra = {};

switch (channel) {
  case 'ali_wap':
    channel_extra = {
      'success_url': 'http://localhost/success',
      'cancel_url': 'http://localhost/cancel'
    };
    break;
}

const now = new Date();
const order_no = Date.parse(now);
reedpay.setProtocol('http');
// console.log(reedpay.getApiField('auth'));
// console.log(reedpay.getApiField('protocol'));
// console.log(reedpay.getApiField('host'));
// console.log(reedpay.getApiField('port'));
// console.log(reedpay.getApiField('basePath'));
// console.log(reedpay.getApiField('version'));
// console.log(reedpay.getApiField('timeout'));
// console.log(reedpay.getApiField('dev'));
// console.log(reedpay.getConstant('USER_AGENT'));

// console.log('resource', reedpay.resources);


reedpay.payment.create({
  mch_order_no: order_no.toString(),
  app_id: APP_ID,
  channel: channel,
  amount: 1,
  //client_ip: '127.0.0.1',
  subject: 'subject',
  description: 'desc',
  channel_extra: channel_extra
}, function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
