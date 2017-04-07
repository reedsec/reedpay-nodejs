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

const APP_ID = 'app_58e6f5b5669d24376a16e8e7';
const API_KEY = 'sk_test_d0a6e3a7f4acb9b4ee4e060b00b32d28';


const reedpay = require('../lib/reedpay')(API_KEY);

// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
reedpay.setSecretKey('reedsec_secret');
// reedpay.setHost('127.0.0.1', '80', 'http');
reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');

// const channel = 'wx_native_cb';
// const trade_type = 'wx_qrcode';
const trade_type = 'wx_scan';
// const channel = 'ali_qraaaaaaaaaaaaaaa';

let extra = {
  client_ip: '127.0.0.1',
  auth_code : '130159042385901390'
};

switch (trade_type) {
  case 'ali_wap':
    extra = {
      'success_url': 'http://localhost/success',
      'cancel_url': 'http://localhost/cancel'
    };
    break;
}

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
  detail: 'test',
  extra: extra
}, function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
