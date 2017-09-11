'use strict';

// const API_KEY = "sk_test_149532cd63d8624cd6e43f2a13898669";
// const APP_ID = 'app_585b91e40382f6615980fe54';


// const APP_ID = 'app_58de1746fd897549f29ef7ee';
// const API_KEY = 'sk_test_11c3ae948a95c343ab68044f4797c829';

// const API_KEY = 'sk_test_6bccc6043b987d3233c6055e37906272';

// const API_KEY = 'sk_test_d0a6e3a7f4acb9b4ee4e060b00b32d28';

// paydev tianxia qrcode
// const APP_ID = 'app_58eb5a9d5b3e556a816a1b94';
// const API_KEY = 'sk_test_8a21a27fc35bc96694656f1213baae2d';
// const reedpay = require('../lib/reedpay')(API_KEY);
// reedpay.setSecretKey('Tester01Secret');

// pay 
const APP_ID = 'app_5916bfea0e6af151b43f5ed4';
const API_KEY = 'sk_live_cc3af5255c48dd376d0b23127f5586c5';
const reedpay = require('../lib/reedpay')(API_KEY);
reedpay.setSecretKey('tT3g%8Edk');

// const reedpay = require('../lib/reedpay')(API_KEY);

// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
// reedpay.setHost('127.0.0.1', '80', 'http');

// reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');
// reedpay.setHost('paydev.reedsec.com', '443', 'https');
reedpay.setHost('pay.reedsec.com', '443', 'https');

reedpay.sale.retrieve({
		// page: 1,
		// app_id: 'app_58e75298d31e6e4ccc0f65f7',
		// app_id: 'app_58e79f6ea0dbb964c907868b',
		// trade_status: 'PAID',
		// trade_type: 'wx_scan',
		time_created: { 
			gt: new Date('2017/06/08')
		},
		// amount: {
		// 	gte: 2
		// }
	},
  function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
