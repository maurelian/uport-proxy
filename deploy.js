// Deploying a new IdentityFactory
//
// Usage: 
// * modify config.json so that selection
//   is your target.
// * node deploy.js

// Node modules
var Web3        = require('web3');
var pudding     = require('ether-pudding');
var Promise     = require('bluebird');
var fs          = require('fs');
var lightwallet = require('eth-lightwallet');
var HookedWeb3Provider = require('hooked-web3-provider')

// Data / Registries / Contracts
var config = require('./config.json');

// Web3 Instance
var web3        = new Web3();
var web3Host     = config[config['selection']].web3Host;
var web3Port = config[config['selection']].web3Port;
var web3Protocol = config[config['selection']].web3Protocol;

// Set up lightwallet
var seed = config.walletSeed;
var globalPw = 'test';
var pwDerivedKey = new Uint8Array([142,203,219,135,23,134,32,168,237,176,106,135,220,154,192,30,192,148,114,113,76,49,65,9,195,8,49,232,244,156,8,69]);
var keystore = new lightwallet.keystore(seed, pwDerivedKey);
keystore.passwordProvider = function(callback) {callback(null, globalPw);}
keystore.generateNewAddress(pwDerivedKey, 1);

// Set provider
var web3Prov = new HookedWeb3Provider({
  host: web3Protocol + '://' + web3Host + ":" + web3Port,
  transaction_signer: keystore
});

web3.setProvider(web3Prov);

var acct = '0x' + keystore.getAddresses()[0];

// IdentityFactory
var IdentityFactory = require("./build/contracts/IdentityFactory.sol.js");
IdentityFactory.setProvider(web3Prov);

// Create new IdentityFactory
console.log('hello')
console.log(acct)
IdentityFactory.new({from: acct, gas: 3000000, gasPrice: 100000000000})
  .then(function(idFactory) {
    console.log('hello')
    config[config['selection']].IdentityFactory = idFactory.address;
    var output = JSON.stringify(config, null, 2) + '\n';
    fs.writeFile('./config.json', output);
    console.log('IdentityFactory: ' + idFactory.address);
  })
