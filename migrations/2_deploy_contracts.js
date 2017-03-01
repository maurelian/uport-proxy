let Lib1 = artifacts.require('Lib1.sol');
let TestRegistry = artifacts.require('TestRegistry.sol');
let Proxy = artifacts.require('Proxy.sol');
let Owned = artifacts.require('Owned.sol');
let RecoverableController = artifacts.require('RecoverableController.sol');
let IdentityFactory = artifacts.require('IdentityFactory.sol');
let RecoveryQuorum = artifacts.require('RecoveryQuorum.sol');
let IdentityFactoryWithRecoveryKey = artifacts.require('IdentityFactoryWithRecoveryKey.sol');

module.exports = function(deployer) {
  deployer.deploy(Lib1);
  deployer.deploy(TestRegistry);
  deployer.deploy(Proxy);
  deployer.deploy(Owned);
  deployer.deploy(RecoverableController);
  deployer.link(Lib1, [IdentityFactory, RecoveryQuorum]);
  deployer.deploy(IdentityFactory);
  deployer.deploy(RecoveryQuorum);
  deployer.deploy(IdentityFactoryWithRecoveryKey);
};
