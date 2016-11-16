module.exports = function(deployer) {
  deployer.deploy(Lib1);
  deployer.deploy(TestRegistry);
  deployer.deploy(Proxy);
  deployer.deploy(Owned);
  deployer.deploy(RecoverableController);
  deployer.deploy(IdentityFactory);
  deployer.deploy(RecoveryQuorum);
};
