'use strict';

// const API_KEY = "sk_test_149532cd63d8624cd6e43f2a13898669";
// const APP_ID = 'app_585b91e40382f6615980fe54';


// reedpay-a2
// const APP_ID = 'app_58fa1b4123f2645b86ad6e4c';
// const API_KEY = 'sk_test_13c3c30c8732d7ea472296a21b362605';


// reedpay-a2
const APP_ID = "app_5948e17cf424990ab8caaf8c";
const API_KEY = "sk_live_2f245c3a97c17ff0d7b327327e7ccb9f";
const reedpay = require('../lib/reedpay')(API_KEY);
reedpay.setSecretKey('reedsec_secret');

// localhost 
// const APP_ID = 'app_58f98005bc16fb675504dbb2';
// const API_KEY = 'sk_test_1db42604935791911c8abc6a7d2d161d';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('reedsec_secret');

// paydev tianxia qrcode
// const APP_ID = 'app_58eb5a9d5b3e556a816a1b94';
// const API_KEY = 'sk_test_8a21a27fc35bc96694656f1213baae2d';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('Tester01Secret');



// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');

// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
// reedpay.setHost('127.0.0.1', '80', 'http');
reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');
// reedpay.setHost('paydev.reedsec.com', '443', 'https');
// reedpay.setHost('pay.reedsec.com', '443', 'https');


reedpay.sale.query(
  // 'pay_qrq2r3yvrW1gumfovtip',
  // 'pay_qrq2r3kqjY1guolgbzxt',
  // 'pay_qrq2r3nzyQ1gup4y3moh',
  // 'pay_qrq2r3qf7U1gupdm975d',
  // 'pay_qrq2r3wbzP1gu8xz5slt',
  // 'pay_26ava3dtuuY1gv9s50xe9',
  // 'pay_26ava3dtuuW1gv9sabooi',
  // 'pay_26ava3doruC1gvc0edk5t',
  // 'pay_3qh5cl1etjW1gvecl8xf7',
  // 'pay_qrq2r3unnW1gve2ds6up',
  // 'pay_26ava3dg1xD1gxfrocbbr',
  // 'pay_26ava3e2idV1h0yn0pksy',
  'pay_26ava3dfy0Y1h3iupe8zc', // a2, txpay
  // 'pay_q6bcazgj9M1gx8vwv29d', // localhost, wxpay
  // 'pay_26ava3di54O1h1ybzqic1', // a2, qq
  // 'pay_26ava3e09aZ1h1ygmdqk1', // a2, qq
  // 'pay_26ava3dky2M1h1ys2dp69', // a2, wx
  function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
