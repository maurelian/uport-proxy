# Uport-Proxy

Proxy contracts for uPort & identity systems. Proxy contracts are a
way of maintaining a persistent identifier/address on a system. The
Proxy contract will interact with other smart contract and it has
access control that allows the user to replace and rotate private keys
while maintaining a persistent identfier.

[More info on Proxy contracts](https://docs.google.com/document/d/1fq0B0T5d0uTJM9rwcT0u2UUCPWzUSYx7GSvZidWVghI)

* Core Proxy contract is: [Proxy.sol](contracts/Proxy.sol)

Interesting Owner contracts are

## OwnerWithAdmin

Owner contract with an User key that controls the proxy
contract. There is also an Admin key that can unilaterally replace the
User key.

## OwnerWithMetaTx

Owner contract that implements Metatransactions (see the document above for more info).


## IdentityFactory

The IdentityFactory creates a proxy contract with an associated controller. When a new identity is created an event is fired.

### Deployed contract

The IdentityFactory is deployed on the ConsenSys testnet at the address

```
0x0b6949ea6dbfd1d122afb67a08b310329e12b67d
```

### Example usage
You can watch the event to see when an identity has been created from a specific address.

```
var identityfactoryContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"userKey","type":"address"},{"name":"adminKey","type":"address"}],"name":"CreateProxyWithController","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"creator","type":"address"},{"indexed":false,"name":"proxy","type":"address"},{"indexed":false,"name":"controller","type":"address"}],"name":"IdentityCreated","type":"event"}]);
var proxyContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"forward","outputs":[],"type":"function"}]);
var ownerwithadminContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"userKey","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"newUserKey","type":"address"}],"name":"updateUserKey","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"adminKey","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"sendTx","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"proxy","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"newAdminKey","type":"address"}],"name":"updateAdminKey","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[{"name":"proxyAddress","type":"address"},{"name":"_userKey","type":"address"},{"name":"_adminKey","type":"address"}],"type":"constructor"}]);

var identityFactory = identityfactoryContract.at([deployed address])

var proxyAddress;
var controllerAddress;
var creatorAddress = '0x123..';
var event = identityFactory.IdentityCreated({creator: creatorAddress}, function(error, result) {
        proxyAddress = result.args.proxy;
        controllerAddress = result.args.controller;
    });

var proxy = proxyContract.at(proxyAddress);
var controller = ownerwithadminContract.at(controllerAddress);
```

