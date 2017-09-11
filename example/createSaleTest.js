'use strict';

// localhost for Alipay merchant_direct
// const API_KEY = 'sk_test_83b113e57bbe85935fb20d4a1c586fa7';
// const APP_ID = 'app_5926ce6b6029dd6f89a90c62';


// reedpay-a2 wechat direct
// const APP_ID = 'app_5928ed91c8ba79267c54a908';
// const API_KEY = 'sk_test_e7a12a0b2b81de275948834b0bb87b11';

// 多码合一沙盒
// const APP_ID = 'app_5929445bca802217a60b6344';
// const API_KEY = 'sk_test_5172bdcdfc4f8cbcca76c497e9f3892c';

// 多码合一
// const APP_ID = 'app_59293f5f936088180fce9d53';
// const API_KEY = 'sk_test_07705c954c576deede8e4e38f68529fc';

// localhost wechat direct
// const APP_ID = 'app_58f98005bc16fb675504dbb2';
// const API_KEY = 'sk_test_1db42604935791911c8abc6a7d2d161d';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('12345');

// localhost tianxia indirect
// const APP_ID = 'app_58e79f6ea0dbb964c907868b';
// const API_KEY = 'sk_test_623b85a513402e6c7a56dffaf51a7260';

// reedpay-a2 tianxia indirect
// const APP_ID = 'app_58e884950aba5c7fc39f7384';
// const API_KEY = 'sk_test_c67e0207aac38cbbd7f20b63d5cb05d4';

// reedpay-a2 pingan
const APP_ID = 'app_598917c237c7ac02ee6edc4e';
const API_KEY = 'sk_live_168f6a294fa32c7ba096f38f05d7be17';

const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('reedsec_secret');
reedpay.setSecretKey('123456');

// paydev tianxia qrcode
// const APP_ID = 'app_58eb5a9d5b3e556a816a1b94';
// const API_KEY = 'sk_test_8a21a27fc35bc96694656f1213baae2d';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('Tester01Secret');

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
reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');
// reedpay.setHost('paydev.reedsec.com', '443', 'https');

// const channel = 'wx_native_cb';
const trade_type = 'wx_jsapi';
// const trade_type = 'wx_qrcode';
// const trade_type = 'ali_qrcode';
// const trade_type = 'qq_qrcode';
// const trade_type = 'wx_qrcode';
// const trade_type = 'ali_qrcode';
// const trade_type = 'ali_scan';
// const trade_type = 'ali_wap';

let extra = {
  client_ip: '127.0.0.1',
  notify_url: 'https://reedpay-a2.reedsec.com/api/v2/webhooks/wxpay',
  show_url: 'https://reedpay-a2.reedsec.com/cashier/reedpay'
  // notify_url: 'https://localhost/webhooks/mypay',
  // openid: 'ouNu5wBrEdsxnXBegLrZdDPhE3yY'
  // auth_code : '285628038695063500'
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





























