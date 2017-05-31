'use strict';

// localhost tianxia transfer
// const APP_ID = 'app_590a5c3bd5888c08812c55b6';
// const API_KEY = 'sk_test_d23527e898ce2dfb5b29c8db4f372b45';

// reedpay-a2 tianxia trasfer
// const API_KEY = 'sk_test_4126bcba3b191733c7e4f97a6bd2482e';

// localhost tianxia indirect
// const APP_ID = 'app_58e79f6ea0dbb964c907868b';
// const API_KEY = 'sk_test_623b85a513402e6c7a56dffaf51a7260';

// paydev tianxia transfer
// const APP_ID = 'app_590c525ee92b8365b209d959';
// const API_KEY = 'sk_test_9a75a2403672109f1c371fcf6d11b2f1';

// pay tianxia transfer
const APP_ID = 'app_5916bfea0e6af151b43f5ed4';
const API_KEY = 'sk_live_cc3af5255c48dd376d0b23127f5586c5';

const reedpay = require('../lib/reedpay')(API_KEY);

// reedpay.setPrivateKeyPath(__dirname + '/reedpay_private_key.pem');
// reedpay.setSecretKey('secret');
// reedpay.setSecretKey('8.8.8.8');
// reedpay.setSecretKey('1234');
// reedpay.setHost('127.0.0.1', '80', 'http');
// reedpay.setHost('reedpay-a2.reedsec.com', '443', 'https');
// reedpay.setHost('paydev.reedsec.com', '443', 'https');
reedpay.setHost('pay.reedsec.com', '443', 'https');

reedpay.balance.query({
		app_id: APP_ID,
		channel: 'TIANXIAPAY'
	},
  function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
