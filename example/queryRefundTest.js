'use strict';

// const API_KEY = "sk_test_149532cd63d8624cd6e43f2a13898669";
// const APP_ID = 'app_585b91e40382f6615980fe54';


// const APP_ID = 'app_58de1746fd897549f29ef7ee';
// const API_KEY = 'sk_test_11c3ae948a95c343ab68044f4797c829';

// const API_KEY = 'sk_test_6bccc6043b987d3233c6055e37906272';

const API_KEY = 'sk_test_8a21a27fc35bc96694656f1213baae2d';

// localhost tianxia indirect
// const APP_ID = 'app_58e79f6ea0dbb964c907868b';
// const API_KEY = 'sk_test_623b85a513402e6c7a56dffaf51a7260';

const reedpay = require('../lib/reedpay')(API_KEY);

// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
reedpay.setHost('127.0.0.1', '80', 'http');
// reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');
// reedpay.setHost('paydev.reedsec.com', '443', 'https');

// reedpay.refund.query(
//   'pay_qrq2r3unnW1gve2ds6up',
//   'pay_26ava3dg1xD1gxfrocbbr',
//   function(err, res) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(res);
// });

reedpay.sale.queryRefund(
  'pay_qrq2r3unnW1gve2ds6up',
  'pay_26ava3dg1xD1gxfrocbbr',
  function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
