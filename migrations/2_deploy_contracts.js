module.exports = function(deployer) {
  deployer.deploy(TestRegistry);
  deployer.autolink();
  deployer.deploy(Proxy);
  deployer.deploy(Owned);
  deployer.autolink();
  deployer.deploy(RecoverableController);
  deployer.autolink();
  deployer.deploy(IdentityFactory);
  deployer.autolink();
  deployer.deploy(RecoveryQuorum);
  deployer.autolink();
};
