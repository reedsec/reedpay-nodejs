'use strict';

// localhost tianxia trasfer
const APP_ID = 'app_590a5c3bd5888c08812c55b6';
const API_KEY = 'sk_test_d23527e898ce2dfb5b29c8db4f372b45';
const reedpay = require('../lib/reedpay')(API_KEY);
reedpay.setSecretKey('reedsec_secret');



// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
// reedpay.setSecretKey('reedsec_secret');
reedpay.setHost('127.0.0.1', '80', 'http');
// reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');
// reedpay.setHost('paydev.reedsec.com', '443', 'https');


const trade_type = 'b2c_txpay';


let extra = {
  client_ip: '127.0.0.1',
  payee_name: '国采支付',
  payee_account_id: '6225887805085784',
  payee_account_type: 'BUSINESS',
  bank_name: '',
  bank_branch_code: '308584000013',
  bank_branch_name: ''
};

const now = new Date();
const order_no = now.getTime();


reedpay.transfer.create({
  mch_order_no: order_no.toString(),
  app_id: APP_ID,
  trade_type: trade_type,
  amount: 1,
  description: '代付测试',
  extra: extra
}, function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
