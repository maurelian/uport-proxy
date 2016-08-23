var lightwallet = require('eth-signer');

const LOG_NUMBER_1 = 1234;
const LOG_NUMBER_2 = 2345;

contract("RecoveryQuorum", (accounts) => {
  var recoverableController;
  var recoveryQuorum;
  var user1;
  var user2;
  var recovery1;
  var delegateList;

  var delegateIsInit =          0;
  var delegateDeletedAfter =    1;
  var delegatePendingUntil =    2;
  var delegateProposedUserKey = 3;

  var shortTimeLock = 2;
  var longTimeLock  = 5;

  before(() => {
    // Truffle deploys contracts with accounts[0]
    proxy = Proxy.deployed();
    testReg = TestRegistry.deployed();
    user1 = accounts[0];
    user2 = accounts[1];
    recovery1 = accounts[2];
    delegateList = [
      accounts[3],
      accounts[4],
      accounts[5],
      accounts[6]
    ];
  });

  it("Correctly deploys contract", (done) => {
    RecoverableController.new(proxy.address, user1, longTimeLock, shortTimeLock, {from: recovery1})
    .then((newRC) => {
      recoverableController = newRC;
      return RecoveryQuorum.new(recoverableController.address, delegateList);
    }).then((newRQ) => {
      recoveryQuorum = newRQ;
      return recoverableController.changeRecoveryFromRecovery(recoveryQuorum.address, {from: recovery1});
    }).then(() => {
      return recoverableController.recoveryKey.call();
    }).then((RCrecoveryKey) => {
      assert.equal(RCrecoveryKey, recoveryQuorum.address, "Controller's recoverKey should be the RQ's address")
      return recoveryQuorum.controller.call();
    }).then((RCcontroller) => {
      assert.equal(RCcontroller, recoverableController.address, "RQ's controller var should be the controller's address")
      return recoveryQuorum.controller();
    }).then((controllerAddress) => {
      assert.equal(controllerAddress, recoverableController.address);
      // return recoveryQuorum.neededSigs();
    // }).then((neededSigs) => {
      // assert.equal(neededSigs, 2);
      return recoveryQuorum.delegates.call(delegateList[0]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit]);
      return recoveryQuorum.delegates.call(delegateList[1]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit]);
      return recoveryQuorum.delegates.call(delegateList[2]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit]);
      return recoveryQuorum.delegates.call(delegateList[3]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit]);
      assert.equal(delegate[delegateProposedUserKey], 0x0);
      assert.equal(delegate[delegatePendingUntil].toNumber(), 0);
      assert.isAtLeast(delegate[delegateDeletedAfter].toNumber(), 31536000000000);//million years
      return recoveryQuorum.delegates.call(user1);
    }).then((delegate) => {
      assert.isFalse(delegate[delegateIsInit]);
      return recoveryQuorum.delegates.call(user2);
    }).then((delegate) => {
      assert.isFalse(delegate[delegateIsInit]);
      return recoveryQuorum.delegates.call(recovery1);
    }).then((delegate) => {
      assert.isFalse(delegate[delegateIsInit]);
      return recoveryQuorum.delegates.call(0x0);
    }).then((delegate) => {
      assert.isFalse(delegate[delegateIsInit]);
      done();
    }).catch(done);
  });

  it("Non-delegate can't sign recovery", (done) => {
    recoveryQuorum.signUserChange(user2, {from: user1})
    .then(() => {
      return recoveryQuorum.collectedSignatures.call(user2);
    }).then((collectedSignatures) => {
      assert.equal(collectedSignatures.toNumber(), 0, "only delegates should be able to add to the number of collectedSigs.");
      done();
    }).catch(done);
  });

  it("delegate can sign recovery", (done) => {
    recoveryQuorum.signUserChange(user2, {from: delegateList[0]})
    .then(() => {
      return recoverableController.userKey.call();
    }).then((userKey) => {
      return recoveryQuorum.collectedSignatures.call(user2);
    }).then((collectedSignatures) => {
      assert.equal(collectedSignatures.toNumber(), 1, "Authorized delegate should add to the number of collectedSigs.");
      done();
    }).catch(done);
  });

  it("delegate can't sign recovery twice", (done) => {
    recoveryQuorum.signUserChange(user2, {from: delegateList[0]})
    .then(() => {
      return recoveryQuorum.collectedSignatures.call(user2);
    }).then((collectedSignatures) => {
      assert.equal(collectedSignatures.toNumber(), 1, "Delegate that already sign should not be able to sign again");
      done();
    }).catch(done);
  });

  it("Insufficient signatures can not recover controller user key", (done) => {
    recoveryQuorum.collectedSignatures.call(user2)
    .then((collectedSignatures) => {
      assert.equal(collectedSignatures.toNumber(), 1, "should keep track of how many votes user2 has (1)");
      return recoveryQuorum.changeUserKey(user2, {from: delegateList[0]});
    }).then(() => {
      return recoverableController.userKey.call();
    }).then((userKey) => {
      assert.equal(userKey, user1, "User key in controller should not have changed.");
      return recoveryQuorum.collectedSignatures.call(user2)
    }).then((collectedSignatures) => {
      assert.equal(collectedSignatures.toNumber(), 1, "should not have changed since called previously");
      done();
    }).catch(done);
  });

  it("Enough signatures can recover controller user key", (done) => {
    recoveryQuorum.signUserChange(user2, {from: delegateList[1]})
    .then(() => {
      return recoveryQuorum.signUserChange(user2, {from: delegateList[2]})
    }).then(() => {
      return recoveryQuorum.collectedSignatures.call(user2);
    }).then((collectedSigs) => {
      assert.equal(collectedSigs.toNumber(), 0, "collected sigs should get reset after changeUserKey")
      return recoverableController.userKey.call();
    }).then((userKey) => {
      assert.equal(userKey, user2, "User key in controller should have been updated.");
      return recoveryQuorum.delegates.call(user1);
    }).then((delegate) => {
      assert.equal(delegate[delegateProposedUserKey], 0x0, "Signatures should reset after a user key recovery");
      return recoveryQuorum.delegates.call(user2);
    }).then((delegate) => {
      assert.equal(delegate[delegateProposedUserKey], 0x0, "Signatures should reset after a user key recovery");
      return recoveryQuorum.delegates.call(delegateList[0]);
    }).then((delegate) => {
      assert.equal(delegate[delegateProposedUserKey], 0x0, "Signatures should reset after a user key recovery");
      return recoveryQuorum.delegates.call(delegateList[1]);
    }).then((delegate) => {
      assert.equal(delegate[delegateProposedUserKey], 0x0, "Signatures should reset after a user key recovery");
      return recoveryQuorum.collectedSignatures.call(user2);
    }).then((collectedSignatures) => {
      assert.equal(collectedSignatures, 0, "Signatures should have reset after a user key recovery");
      done();
    }).catch(done);
  });

  it("Only controller user can add delegates to quorum", (done) => {
    recoveryQuorum.replaceDelegates([], [accounts[7]], {from: user1})
    .then(() => {
      return recoveryQuorum.delegates.call(accounts[7]);
    }).then((delegate) => {
      assert.isFalse(delegate[delegateIsInit], "Random user should not be able to add additional delegates to quorum.");
      return recoveryQuorum.replaceDelegates([], [accounts[7]], {from: user2})
    }).then(() => {
      return recoveryQuorum.delegates.call(accounts[7]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit], "Controller userKey should be able to add additional delegates to quorum.");
      assert.approximately(delegate[delegatePendingUntil].toNumber(), Date.now()/1000 + longTimeLock, 5);
      return recoveryQuorum.signUserChange(0x123, {from: delegateList[1]});
    }).then(() => {
      return recoveryQuorum.delegates.call(delegateList[1]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit], "This delegate exists from contract creation");
      assert.equal(delegate[delegateProposedUserKey], 0x0123);
      assert.equal(delegate[delegatePendingUntil].toNumber(), 0);
      assert.isAtLeast(delegate[delegateDeletedAfter].toNumber(), 31536000000000, "inits to 1million years");
      return recoveryQuorum.replaceDelegates([], [delegateList[1]], {from: user2})
    }).then(() => {
      return recoveryQuorum.delegates.call(delegateList[1]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit], "Trying to add existing delegate should affect nothing");
      assert.equal(delegate[delegateProposedUserKey], 0x0123, "Trying to add existing delegate should affect nothing");
      assert.equal(delegate[delegatePendingUntil].toNumber(), 0, "Trying to add existing delegate should affect nothing");
      assert.isAtLeast(delegate[delegateDeletedAfter].toNumber(), 31536000000000, "Trying to add existing delegate should affect nothing");
      done();
    }).catch(done);
  });

  it("Newly added delegate's signature should not count towards quorum yet", (done) => {
    recoveryQuorum.replaceDelegates([], [accounts[8]], {from: user2})
    .then(() => {
      return recoveryQuorum.delegates.call(accounts[8]);
    }).then((delegate) => {
      assert.isTrue(delegate[delegateIsInit], "New delegate should have been added by user");
      assert.equal(delegate[delegateProposedUserKey], 0x0);
      assert.approximately(delegate[delegatePendingUntil].toNumber(), Date.now()/1000 + longTimeLock, 5);
      return recoveryQuorum.delegates.call(accounts[7]);
    }).then((delegate) =>{
      assert.isTrue(delegate[delegateIsInit], "New delegate should have been added by user");
      assert.equal(delegate[delegateProposedUserKey], 0x0);
      assert.approximately(delegate[delegatePendingUntil].toNumber(), Date.now()/1000 + longTimeLock, 5);
      return recoveryQuorum.collectedSignatures.call(user2)
    }).then((collectedSignatures) => {
      assert.equal(collectedSignatures, 0, "Signatures should have reset after a user key recovery");
      return recoveryQuorum.signUserChange(user1, {from: accounts[7]});
    }).then(() => {
      return recoveryQuorum.signUserChange(user1, {from: accounts[8]});
    }).then(() => {
      return recoveryQuorum.collectedSignatures.call(user1)
    }).then((collectedSignatures) => {
      assert.equal(collectedSignatures, 0, "Newly added delegates should not be able to add valid signature yet");
      return recoveryQuorum.delegates.call(accounts[7]);
    }).then((delegate) => {
      assert.equal(delegate[delegateProposedUserKey], user1,                                           "Proposed user should be set");
      assert.approximately(delegate[delegatePendingUntil].toNumber(), Date.now()/1000 + longTimeLock, 5, "But it should be locked (doesn't count yet)");
      return recoveryQuorum.changeUserKey(user1, {from: accounts[7]});
    }).then(() => {
      return recoverableController.userKey.call();
    }).then((userKey) => {
      assert.equal(userKey, user2, "controller userKey should not change because these delegates are too new");
      done();
    }).catch(done);
  });
});
