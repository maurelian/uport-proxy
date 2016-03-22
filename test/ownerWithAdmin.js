var expect          = require('chai').expect;
var Promise         = require('bluebird');
var Web3            = require('web3');
var web3            = new Web3();
var web3prov        = new web3.providers.HttpProvider('http://localhost:8545');
web3.setProvider(web3prov);

var pudding         = require('ether-pudding');
pudding.setWeb3(web3);

var lightwallet = require('eth-lightwallet');

var Proxy = require("../environments/development/contracts/Proxy.sol.js").load(pudding);
Proxy = pudding.whisk({abi: Proxy.abi, binary: Proxy.binary, contract_name: Proxy.contract_name})

var TestRegistry = require("../environments/development/contracts/TestRegistry.sol.js").load(pudding);
TestRegistry = pudding.whisk({abi: TestRegistry.abi, binary: TestRegistry.binary, contract_name: TestRegistry.contract_name})

var OwnerWithAdmin = require("../environments/development/contracts/OwnerWithAdmin.sol.js").load(pudding);
OwnerWithAdmin = pudding.whisk({abi: OwnerWithAdmin.abi, binary: OwnerWithAdmin.binary, contract_name: OwnerWithAdmin.contract_name})

var proxy;
var testReg;
var ownerWithAdmin;
var user;
var user1;
var admin;
var logNumber = 1234;
var logNumber1 = 5678;
var data;

describe("Admin-style Proxy Owner", function () {
  this.timeout(10000);
  it("Creates and uses a proxy with Admin-style Owner", function(done) {
    web3.eth.getAccounts(function(err, acct) {
      user = acct[0];
      user1 = acct[1];
      admin = acct[2];
      var newContracts = [Proxy.new({from: user}),
                          TestRegistry.new({from: user})
                         ];
      Promise.all(newContracts).then(function(cc) {
        proxy = cc[0];
        testReg = cc[1];
        return OwnerWithAdmin.new(proxy.address, user, admin, {from: user});
      }).then(function (newOwner) {
        ownerWithAdmin = newOwner;
        // Transfer ownership to the owner Contract.
        return proxy.transfer(ownerWithAdmin.address, {from:user});
      }).then(function () {
        // Encode the transaction to send to the Owner contract
        data = '0x' + lightwallet.txutils._encodeFunctionTxData('register', ['uint256'], [logNumber]);
        return ownerWithAdmin.sendTx(testReg.address, 0, data, {from: user});
      }).then(function() {
        // Verify that the proxy address is logged as the sender
        return testReg.registry.call(proxy.address);
      }).then(function(regData) {
        expect(regData.toNumber()).to.equal(logNumber);
        // update the user key
        return ownerWithAdmin.updateUserKey(user1, {from: admin});
      }).then(function() {
        // Try to send from old key
        data = '0x' + lightwallet.txutils._encodeFunctionTxData('register', ['uint256'], [logNumber1]);
        return ownerWithAdmin.sendTx(testReg.address, 0, data, {from: user});
      }).then(function() {
        return testReg.registry.call(proxy.address);
      }).then(function(regData) {
        // Make sure the logged number hasn't changed
        expect(regData.toNumber()).to.equal(logNumber);
        // Send with new key
        return ownerWithAdmin.sendTx(testReg.address, 0, data, {from: user1});
      }).then(function() {
        return testReg.registry.call(proxy.address);
      }).then(function(regData) {
        // Make sure the logged number has changed now
        expect(regData.toNumber()).to.equal(logNumber1);
        done();
      }).catch(done)
    })
  });


});

