'use strict';

// const API_KEY = "sk_test_149532cd63d8624cd6e43f2a13898669";
// const APP_ID = 'app_585b91e40382f6615980fe54';


// const APP_ID = 'app_58de1746fd897549f29ef7ee';
const API_KEY = 'sk_test_11c3ae948a95c343ab68044f4797c829';

const reedpay = require('../lib/reedpay')(API_KEY);

// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
reedpay.setHost('127.0.0.1', '80', 'http');


reedpay.sale.query(
  // 'pay_qrq2r3yvrW1gumfovtip',
  // 'pay_qrq2r3kqjY1guolgbzxt',
  // 'pay_qrq2r3nzyQ1gup4y3moh',
  'pay_qrq2r3qf7U1gupdm975d',
  // 'pay_qrq2r3wbzP1gu8xz5slt',
  function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
