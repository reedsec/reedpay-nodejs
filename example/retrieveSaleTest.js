'use strict';

// const API_KEY = "sk_test_149532cd63d8624cd6e43f2a13898669";
// const APP_ID = 'app_585b91e40382f6615980fe54';


// const APP_ID = 'app_58de1746fd897549f29ef7ee';
// const API_KEY = 'sk_test_11c3ae948a95c343ab68044f4797c829';

// const API_KEY = 'sk_test_6bccc6043b987d3233c6055e37906272';

const API_KEY = 'sk_test_d0a6e3a7f4acb9b4ee4e060b00b32d28';


const reedpay = require('../lib/reedpay')(API_KEY);

// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
// reedpay.setHost('127.0.0.1', '80', 'http');

reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');

reedpay.sale.retrieve({
		// page: 1,
		time_created: { 
			gt: new Date('2017/04/07')
		},
		// app_id: '58e6f5b5669d24376a16e8e7',
		// trade_status: 'PAID',
		// amount: {
		// 	gte: 2
		// },
		// trade_type: 'wx_scan'
	},
  function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
