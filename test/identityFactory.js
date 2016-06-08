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
    var event = identityFactory.IdentityCreated({creator: user2})
    event.watch((error, result) => {
      // Check that event has addresses to correct contracts
      assert.equal(web3.eth.getCode(result.args.proxy),
                   web3.eth.getCode(deployedProxy.address),
                   "Created proxy should have correct code");
      assert.equal(web3.eth.getCode(result.args.controller),
                   web3.eth.getCode(deployedOwnerWithAdmin.address),
                   "Created controller should have correct code");
      proxy = Proxy.at(result.args.proxy);
      ownerWithAdmin = OwnerWithAdmin.at(result.args.controller);
      // Check that the mapping has correct proxy address
      identityFactory.senderToProxy.call(user2).then((createdProxyAddress) => {
        assert(createdProxyAddress, proxy.address, "Mapping should have the same address as event");
        done();
      }).catch(done);
    });
    identityFactory.CreateProxyWithController(user1, admin, {from: user2})
  });

  it("Created proxy should have correct state", (done) => {
    return proxy.owner.call().then((createdControllerAddress) => {
      assert.equal(createdControllerAddress, ownerWithAdmin.address);
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
