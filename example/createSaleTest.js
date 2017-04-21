'use strict';



// const API_KEY = "sk_test_149532cd63d8624cd6e43f2a13898669";
// const APP_ID = 'app_585b91e40382f6615980fe54';

// const API_KEY = 'sk_test_d84ec87b7e6dbca5a8ffa6c0f7f25115';
// const API_KEY = 'sk_test_a2df16fc8e44f8818cc722927d4c641e';
// const APP_ID = 'app_58d126eaea4a965e730114e8';

// const APP_ID = 'app_58de1746fd897549f29ef7ee';
// const API_KEY = 'sk_test_11c3ae948a95c343ab68044f4797c829';

// const APP_ID = 'app_58e637bd23fbf411b32457f5';
// const API_KEY = 'sk_test_6bccc6043b987d3233c6055e37906272';

// reedpay-a2 wechat direct
// const APP_ID = 'app_58e74d9b58c448597cfcd19f';
// const API_KEY = 'sk_test_8c70c3b2f810732a68392a09ffe45171';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('reedsec_secret');

// localhost wechat direct
// const APP_ID = 'app_58e75298d31e6e4ccc0f65f7';
// const API_KEY = 'sk_test_5b934ecf2832ef649c4236cfeedacbdb';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('reedsec_secret');

// localhost tianxia indirect
// const APP_ID = 'app_58e79f6ea0dbb964c907868b';
// const API_KEY = 'sk_test_623b85a513402e6c7a56dffaf51a7260';

// reedpay-a2 tianxia indirect
// const APP_ID = 'app_58e884950aba5c7fc39f7384';
// const API_KEY = 'sk_test_c67e0207aac38cbbd7f20b63d5cb05d4';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('reedsec_secret');

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

// const channel = 'wx_native_cb';
// const trade_type = 'wx_jsapi';
// const trade_type = 'wx_qrcode';
// const trade_type = 'ali_qrcode';
// const trade_type = 'qq_qrcode';
const trade_type = 'wx_qrcode';
// const channel = 'ali_qraaaaaaaaaaaaaaa';

let extra = {
  client_ip: '127.0.0.1',
  // notify_url: 'https://reedpay-a2.reedsec.com/api/v2/webhooks/reedpay',
  notify_url: 'https://paydev.reedsec.com/api/v2/webhooks/reedpay',
  // openid: 'ouNu5wBrEdsxnXBegLrZdDPhE3yY'
  // auth_code : '130050713223137284'
};

// switch (trade_type) {
//   case 'ali_wap':
//     extra = {
//       'success_url': 'http://localhost/success',
//       'cancel_url': 'http://localhost/cancel'
//     };
//     break;
// }

const now = new Date();
const order_no = now.getTime();
// reedpay.setProtocol('https');
// reedpay.setProtocol('http');

reedpay.sale.create({
  mch_order_no: order_no.toString(),
  app_id: APP_ID,
  trade_type: trade_type,
  amount: 1,
  subject: 'test',
  // detail: 'test',
  extra: extra
}, function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
