var expect          = require('chai').expect;
var Promise         = require('bluebird');
var Web3            = require('web3');
var web3            = new Web3();
var HookedWeb3Provider = require('hooked-web3-provider');
var pudding = require('ether-pudding');

var lightwallet = require('eth-lightwallet');
var Signer = lightwallet.signer;
var HDSigner = lightwallet.signers.HDSigner;
var Phrase = lightwallet.generators.Phrase;
var ProxySigner = lightwallet.signers.ProxySigner;

var seed = 'tackle crystal drum type spin nest wine occur humor grocery worry pottery'
var hdSigner = new HDSigner(Phrase.toHDPrivateKey(seed));
var myAddress = hdSigner.getAddress();

// var pwDerivedKey = new Uint8Array([142,203,219,135,23,134,32,168,237,176,106,135,220,154,192,30,192,148,114,113,76,49,65,9,195,8,49,232,244,156,8,69]);
// var ks = new lightwallet.keystore(seed, pwDerivedKey)
// ks.passwordProvider = function(callback) {callback(null, 'test');}
// ks.generateNewAddress(pwDerivedKey);
// var myAddress = '0x' + ks.getAddresses()[0];
// console.log(myAddress)

var web3Prov = new HookedWeb3Provider({
  host: 'http://localhost:8545',
  transaction_signer: new Signer(hdSigner),
//  transaction_signer: ks
});

web3.setProvider(web3Prov);
pudding.setWeb3(web3);

var Proxy = require("../environments/development/contracts/Proxy.sol.js").load(pudding);
Proxy = pudding.whisk({abi: Proxy.abi, binary: Proxy.binary, contract_name: Proxy.contract_name})

var TestRegistry = require("../environments/development/contracts/TestRegistry.sol.js").load(pudding);
TestRegistry = pudding.whisk({abi: TestRegistry.abi, binary: TestRegistry.binary, contract_name: TestRegistry.contract_name})

var proxy;
var testReg;
var logNumber = 1234;
var proxySigner;

// NOTE: when adding this and using mocha, the test fails
// with "Could not unlock signer account"

// describe("Proxy contract signer & provider", function () {
//   this.timeout(10000);
//   it("Changes the owner of a proxy", function(done) {

var newContracts = [Proxy.new({from: myAddress}),
                    TestRegistry.new({from: myAddress})];
Promise.all(newContracts).then(function(cc) {
  proxy = cc[0];
  testReg = cc[1];

  // Set up the new Proxy provider
  proxySigner = new Signer(new ProxySigner(proxy.address, hdSigner));
  var web3ProxyProvider = new HookedWeb3Provider({
    host: 'http://localhost:8545',
    transaction_signer: proxySigner
  });

  web3Proxy = new Web3(web3ProxyProvider);
  pudding.setWeb3(web3Proxy);

  Proxy = require("../environments/development/contracts/Proxy.sol.js").load(pudding);
  Proxy = pudding.whisk({abi: Proxy.abi, binary: Proxy.binary, contract_name: Proxy.contract_name})

  TestRegistry = require("../environments/development/contracts/TestRegistry.sol.js").load(pudding);
  TestRegistry = pudding.whisk({abi: TestRegistry.abi, binary: TestRegistry.binary, contract_name: TestRegistry.contract_name})

  proxy = Proxy.at(proxy.address);
  testReg = TestRegistry.at(testReg.address);

  // Register the number from proxy.address
  return testReg.register(logNumber, {from: proxy.address});
}).then(function() {
  // Verify that the proxy address is logged
  return testReg.registry.call(proxy.address);
}).then(function(regData) {
  var success = (regData.toNumber() === logNumber);
  console.log("Proxy contract signer & provider test. Success: " + success);   
});

//})
//})
