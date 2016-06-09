var lightwallet = require('eth-lightwallet');

const LOG_NUMBER_1 = 1234;
const LOG_NUMBER_2 = 2345;

contract("RecoveryQuorum", (accounts) => {
  var basicController;
  var recoveryQuorum;
  var user1;
  var user2;
  var admin;
  var userList;

  before(() => {
    // Truffle deploys contracts with accounts[0]
    proxy = Proxy.deployed();
    testReg = TestRegistry.deployed();
    user1 = accounts[0];
    user2 = accounts[1];
    admin = accounts[2];
    userList = [
        accounts[3],
        accounts[4],
        accounts[5],
        accounts[6]
    ];
  });

  it("Correctly deploys contract", (done) => {
    BasicController.new(proxy.address, user1, admin).then((newOWA) => {
      basicController = newOWA;
      return RecoveryQuorum.new(basicController.address, userList, 3);
    }).then((newRQ) => {
      recoveryQuorum = newRQ;
      // put the recoveryQuorum as the admin of the controller
      return basicController.updateAdminKey(recoveryQuorum.address, {from: admin});
    }).then(() => {
      return recoveryQuorum.controller();
    }).then((controllerAddress) => {
      assert.equal(controllerAddress, basicController.address);
      return recoveryQuorum.neededSigs();
    }).then((neededSigs) => {
      assert.equal(neededSigs, 3);
      return recoveryQuorum.isUser.call(userList[0]);
    }).then((isUser) => {
      assert.isTrue(isUser);
      return recoveryQuorum.isUser.call(userList[1]);
    }).then((isUser) => {
      assert.isTrue(isUser);
      return recoveryQuorum.isUser.call(userList[2]);
    }).then((isUser) => {
      assert.isTrue(isUser);
      return recoveryQuorum.isUser.call(userList[3]);
    }).then((isUser) => {
      assert.isTrue(isUser);
      return recoveryQuorum.isUser.call(user1);
    }).then((isUser) => {
      assert.isFalse(isUser);
      done();
    }).catch(done);
  });

  it("Non-user can't sign recovery", (done) => {
    recoveryQuorum.recoverControllerUser(user2, {from: user2}).then(() => {
      return recoveryQuorum.collectedSigs.call();
    }).then((collectedSigs) => {
      assert.equal(collectedSigs.toNumber(), 0, "Unauthorized user should not add to the number of collectedSigs.");
      done();
    }).catch(done);
  });

  it("User can sign recovery", (done) => {
    recoveryQuorum.recoverControllerUser(user2, {from: userList[0]}).then(() => {
      return recoveryQuorum.collectedSigs.call();
    }).then((collectedSigs) => {
      assert.equal(collectedSigs.toNumber(), 1, "Authorized user should add to the number of collectedSigs.");
      done();
    }).catch(done);
  });

  it("User can't sign recovery twice", (done) => {
    recoveryQuorum.recoverControllerUser(user2, {from: userList[0]}).then(() => {
      return recoveryQuorum.collectedSigs.call();
    }).then((collectedSigs) => {
      assert.equal(collectedSigs.toNumber(), 1, "User that already sign should not be able to sign again");
      done();
    }).catch(done);
  });

  it("Enough signatures can recover controller user key", (done) => {
    recoveryQuorum.recoverControllerUser(user2, {from: userList[1]}).then(() => {
      return recoveryQuorum.collectedSigs.call();
    }).then((collectedSigs) => {
      assert.equal(collectedSigs.toNumber(), 2, "Authorized user should add to the number of collectedSigs.");
      return recoveryQuorum.recoverControllerUser(user2, {from: userList[2]});
    }).then(() => {
      return basicController.userKey.call();
    }).then((userKey) => {
      assert.equal(userKey, user2, "User key in controller should have been updated.");
      done();
    }).catch(done);
  });
});
