var HookedWeb3Provider = require('hooked-web3-provider');
var lightwallet = require('eth-lightwallet');

var Signer = lightwallet.signer;
var HDSigner = lightwallet.signers.HDSigner;
var Phrase = lightwallet.generators.Phrase;
var ProxySigner = lightwallet.signers.ProxySigner;

const SEED = 'tackle crystal drum type spin nest wine occur humor grocery worry pottery';
const LOG_NUMBER = 1234;

contract("Uport proxy integration tests", (accounts) => {
  var identityFactory;
  var testReg;
  var proxy;
  var ownerWithAdmin;

  var proxySigner;
  var hdSigner;
  var user;
  var admin;

  before(() => {
    hdSigner = new HDSigner(Phrase.toHDPrivateKey(SEED));

    user = hdSigner.getAddress();
    admin = accounts[0];
    web3.eth.sendTransaction({from: admin, to: user, value: web3.toWei(1000)});

    var web3Prov = new HookedWeb3Provider({
      host: 'http://localhost:8545',
      transaction_signer: new Signer(hdSigner),
    });
    web3.setProvider(web3Prov);
    // Truffle deploys contracts with accounts[0]
    identityFactory = IdentityFactory.deployed();
    testReg = TestRegistry.deployed();
  });

  it("Create proxy and controller contracts", (done) => {
    var event = identityFactory.IdentityCreated({creator: user})
    event.watch((error, result) => {
      proxy = Proxy.at(result.args.proxy);
      ownerWithAdmin = OwnerWithAdmin.at(result.args.controller);
      done();
    });
    identityFactory.CreateProxyWithController(user, admin, {from: user}).catch(done);
  });

  it("Use proxy for simple function call", (done) => {
    // Set up the new Proxy provider
    proxySigner = new Signer(new ProxySigner(proxy.address, hdSigner, ownerWithAdmin.address));
    var web3ProxyProvider = new HookedWeb3Provider({
      host: 'http://localhost:8545',
      transaction_signer: proxySigner
    });
    web3.setProvider(web3ProxyProvider);

    // Register the number from proxy.address
    testReg.register(LOG_NUMBER, {from: proxy.address}).then(() => {
      // Verify that the proxy address is logged
      return testReg.registry.call(proxy.address);
    }).then((regData) => {
      assert.equal(regData.toNumber(), LOG_NUMBER);
      done();
    }).catch(done);
  });
});
