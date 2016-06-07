var lightwallet = require('eth-lightwallet');

const LOG_NUMBER_1 = 1234;
const LOG_NUMBER_2 = 2345;

contract("OwnerWithAdmin", (accounts) => {
  var ownerWithAdmin;
  var testReg;
  var user1;
  var user2;
  var admin;

  before(() => {
    // Truffle deploys contracts with accounts[0]
    proxy = Proxy.deployed();
    testReg = TestRegistry.deployed();
    user1 = accounts[0];
    user2 = accounts[1];
    admin = accounts[2];
  });

  it("Correctly deploys contract", (done) => {
    OwnerWithAdmin.new(proxy.address, user1, admin).then((newOWA) => {
      ownerWithAdmin = newOWA;
      ownerWithAdmin.proxy().then((proxyAddress) => {
        assert.equal(proxyAddress, proxy.address);
        return ownerWithAdmin.userKey();
      }).then((userKey) => {
        assert.equal(userKey, user1);
        return ownerWithAdmin.adminKey();
      }).then((adminKey) => {
        assert.equal(adminKey, admin);
        done();
      }).catch(done);
    });
  });

  it("Only sends transactions from correct user", (done) => {
    // Transfer ownership of proxy to the controller contract.
    proxy.transfer(ownerWithAdmin.address, {from:user1}).then(() => {
      // Encode the transaction to send to the Owner contract
      var data = '0x' + lightwallet.txutils._encodeFunctionTxData('register', ['uint256'], [LOG_NUMBER_1]);
      return ownerWithAdmin.sendTx(testReg.address, 0, data, {from: user1});
    }).then(() => {
      // Verify that the proxy address is logged as the sender
      return testReg.registry.call(proxy.address);
    }).then((regData) => {
      assert.equal(regData.toNumber(), LOG_NUMBER_1, "User1 should be able to send transaction");

      // Encode the transaction to send to the Owner contract
      var data = '0x' + lightwallet.txutils._encodeFunctionTxData('register', ['uint256'], [LOG_NUMBER_2]);
      return ownerWithAdmin.sendTx(testReg.address, 0, data, {from: user2});
    }).then(() => {
      // Verify that the proxy address is logged as the sender
      return testReg.registry.call(proxy.address);
    }).then((regData) => {
      assert.notEqual(regData.toNumber(), LOG_NUMBER_2, "User2 should not be able to send transaction");
      done();
    }).catch(done);
  });

  it("Only updates userKey if admin", (done) => {
    ownerWithAdmin.updateUserKey(user2, {from: user2}).then(() => {
      return ownerWithAdmin.userKey();
    }).then((userKey) => {
      assert.notEqual(userKey, user2, "Non-admin should not be able to change user key");
      return ownerWithAdmin.updateUserKey(user2, {from: admin})
    }).then(() => {
      return ownerWithAdmin.userKey();
    }).then((userKey) => {
      assert.equal(userKey, user2, "Admin should be able to change user key");
      done();
    }).catch(done);
  });

  it("Correctly performs transfer", (done) => {
    ownerWithAdmin.transferOwnership(user1, {from: admin}).then(() => {
      return proxy.isOwner.call(user1);
    }).then((isOwner) => {
      assert.isTrue(isOwner, "Owner of proxy should be changed");
      done();
    }).catch(done);
  });
});


