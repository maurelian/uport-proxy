var lightwallet = require('eth-lightwallet');

contract("IdentityFactory", (accounts) => {
  var identityFactory;
  var proxy;
  var deployedProxy;
  var ownerWithAdmin;
  var deployedOwnerWithAdmin;
  var testReg;
  var user1;
  var user2;
  var admin;

  before(() => {
    // Truffle deploys contracts with accounts[0]
    identityFactory = IdentityFactory.deployed();
    deployedProxy = Proxy.deployed();
    deployedOwnerWithAdmin = OwnerWithAdmin.deployed();
    user1 = accounts[0];
    user2 = accounts[1];
    admin = accounts[2];
  });

  it("Correctly creates proxy and controller contract", (done) => {
    identityFactory.CreateProxyWithController(user1, admin, {from: user2}).then(() => {
      // Check for event
      // TODO - test event
      return identityFactory.senderToProxy.call(user2);
    }).then((createdProxyAddress) => {
      assert.equal(web3.eth.getCode(createdProxyAddress),
                   web3.eth.getCode(deployedProxy.address),
                   "Created proxy should have correct code");
      proxy = Proxy.at(createdProxyAddress);
      return proxy.owner.call();
    }).then((createdControllerAddress) => {
      assert.equal(web3.eth.getCode(createdControllerAddress),
                   web3.eth.getCode(deployedOwnerWithAdmin.address),
                   "Created controller should have correct code");
      ownerWithAdmin = OwnerWithAdmin.at(createdControllerAddress);
      done();
    }).catch(done);
  });

  it("Created controller should have correct state", (done) => {
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
