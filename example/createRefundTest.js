'use strict';


// 多码合一沙盒
// const APP_ID = 'app_5929445bca802217a60b6344';
// const API_KEY = 'sk_test_5172bdcdfc4f8cbcca76c497e9f3892c';

// reedpay-a2 多码合一
// const APP_ID = 'app_59293f5f936088180fce9d53';
// const API_KEY = 'sk_test_07705c954c576deede8e4e38f68529fc';


// localhost wechat direct
// const APP_ID = 'app_58f98005bc16fb675504dbb2';
// const API_KEY = 'sk_test_1db42604935791911c8abc6a7d2d161d';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('12345');

// localhost tianxia indirect
// const APP_ID = 'app_5926ce6b6029dd6f89a90c62';
// const API_KEY = 'sk_test_83b113e57bbe85935fb20d4a1c586fa7';

// reedpay-a2 tianxia indirect
// const APP_ID = 'app_58e884950aba5c7fc39f7384';
// const API_KEY = 'sk_test_c67e0207aac38cbbd7f20b63d5cb05d4';


// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey(key);
// reedpay.setSecretKey('reedsec_secret');
// reedpay.setSecretKey('12345');

// paydev tianxia qrcode
const APP_ID = 'app_58eb5a9d5b3e556a816a1b94';
const API_KEY = 'sk_test_8a21a27fc35bc96694656f1213baae2d';
const reedpay = require('../lib/reedpay')(API_KEY);
reedpay.setSecretKey('Tester01Secret');

// paydev tianxia wx_jsapi
// const APP_ID = 'app_58eb5aed5b3e556a816a1b96';
// const API_KEY = 'sk_test_8166314a2a315f25eddc035023f9acfa';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('Tester02Secret');


// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
// reedpay.setSecretKey('reedsec_secret');
// reedpay.setHost('127.0.0.1', '80', 'http');
// reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');
reedpay.setHost('paydev.reedsec.com', '443', 'https');


reedpay.refund.create(
  // 'pay_26ava3e2idV1h0yn0pksy',
  // 'pay_26ava3di54O1h1ybzqic1', // a2, qq
  // 'pay_26ava3e09aZ1h1ygmdqk1', // a2, qq
  'pay_26ava3dky2M1h1ys2dp69', // a2, wx
  {
    app_id: APP_ID,
    refund_amount: 1,
    description: '正常退款'
  }, 
  function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});


// reedpay.sale.createRefund(
//   'pay_qrq2r3unnW1gve2ds6up', 
//   {
//     app_id: APP_ID,
//     refund_amount: 1,
//     description: '正常退款'
//   },
//   function(err, res) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(res);
// });