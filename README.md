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
