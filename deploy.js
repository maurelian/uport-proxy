// Deploying a new PersonaRegistry
//
// Usage: 
// * modify app/javascripts/config.js so that selection
//   is your target.
// * node app/javascripts/deploy.js 0xaabbbcc
//   where 0xaabbbcc is the address of the previous version 
//   of PersonaRegistry

// Node modules
var Web3        = require('web3');
var pudding     = require('ether-pudding');
var Promise     = require('bluebird');
var fs          = require('fs');

// Data / Registries / Contracts
var config = require('./config.json');
console.log( config )

// Web3 Instance
var web3        = new Web3();

// CLI Args
var host     = config[config['selection']].web3Host;
var web3port = config[config['selection']].web3Port;

// Make Providers
var web3prov = new web3.providers.HttpProvider('http://' + host + ':' + web3port);

// Set Providers
web3.setProvider(web3prov);
pudding.setWeb3(web3);

// IdentityFactory
var IdentityFactory = require("./environments/development/contracts/IdentityFactory.sol.js").load(pudding);
IdentityFactory = pudding.whisk({abi: IdentityFactory.abi, binary: IdentityFactory.binary, contract_name: IdentityFactory.contract_name})

// Create new IdentityFactory
web3.eth.getAccounts(function(err, acct) {
    
  IdentityFactory.new({from: acct[0], gas: 500000, gasPrice: 100000000000})
    .then(function(idFactory) {
                    
      config[config['selection']].IdentityFactory = idFactory.address;
      var output = JSON.stringify(config, null, 2) + '\n';
      fs.writeFile('./config.json', output);
      console.log('IdentityFactory: ' + idFactory.address);
    })
});
