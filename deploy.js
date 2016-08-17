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

// Data / Registries / Contracts
var config = require('./config.json');

// Web3 Instance
var web3        = new Web3();
var host     = config[config['selection']].web3Host;
var web3port = config[config['selection']].web3Port;
var web3Protocol = config[config['selection']].web3Protocol;

// Set up lightwallet
var seed = config.walletSeed;
var globalPw = 'test';
var pwDerivedKey = new Uint8Array([142,203,219,135,23,134,32,168,237,176,106,135,220,154,192,30,192,148,114,113,76,49,65,9,195,8,49,232,244,156,8,69]);
var keystore = new lightwallet.keystore(seed, pwDerivedKey);
keystore.passwordProvider = function(callback) {callback(null, globalPw);}
keystore.generateNewAddress(pwDerivedKey, 2);

// Set provider
var web3Prov = new HookedWeb3Provider({
  host: web3Protocol + '://' + web3Host + ":" + web3Port,
  transaction_signer: keystore
});

web3.setProvider(web3Prov);
pudding.setWeb3(web3);

var acct = keystore.getAddresses();

// IdentityFactory
var IdentityFactory = require("./environments/development/contracts/IdentityFactory.sol.js").load(pudding);
IdentityFactory = pudding.whisk({abi: IdentityFactory.abi, binary: IdentityFactory.binary, contract_name: IdentityFactory.contract_name})

// Create new IdentityFactory
    
IdentityFactory.new({from: acct[0], gas: 500000, gasPrice: 100000000000})
  .then(function(idFactory) {
    
    config[config['selection']].IdentityFactory = idFactory.address;
    var output = JSON.stringify(config, null, 2) + '\n';
    fs.writeFile('./config.json', output);
    console.log('IdentityFactory: ' + idFactory.address);
  })
