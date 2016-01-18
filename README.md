# Proxy

- Core contract is: [Proxy.sol](src/proxy.sol)
- Default implementation used is: [Implementation.sol](examples/implementation.sol)

Example custom implementations:

- [ChallengePeriod.sol](examples/challengeperiod.sol)
- [Revokable.sol](examples/revokable.sol)
- [OneOfN.sol](examples/oneofn.sol)
- [Refunder.sol](examples/refunder.sol)

## Changelog

- Explore "option 2" validator proxy.
- Add some example validators.
- Switch from validator proxy to single implementor proxy.
- Explore second `forward` function signature which takes signed transactions
- Make sure proxy forward is only ever called by owner
- Make sure all forwarded txs from proxy have proxy as msg.sender

## Todos

- Fix ecrecover (bytes/bytes32) in implementations
- Calculate gas used for refunder implementation
- Make challengePeriod example only apply to implementation change
