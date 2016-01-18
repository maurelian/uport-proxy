// A Custom proxy implementation
// - Checks that msg.sender is the owner.
// - Forces all forwarded transactions to undergo an n-hour challenge period.

import "Owned.sol";

contract ChallengePeriod is Owned {
    
    mapping( bytes32 => uint ) public txTimestamps;
    uint public challengeTime;
    uint nonce;

    function ChallengePeriod(address _owner, uint _challengeTimeInHours) {
        owner = _owner;
        challengeTime = _challengeTimeInHours * 1 hours;
    }

    function proxy(address proxy, address destination, uint value, bytes data) ifOwner(msg.sender) {
        bytes32 txHash = sha3(msg.sender, destination, value, data, nonce);
        if (txTimestamps[txHash] != uint(0)) {
            if (block.timestamp >= txTimestamps[txHash] + challengeTime) {
                delete txTimestamps[txHash];
                Proxy(proxy).forward(destination, value, data);
            }
        } else {
            txTimestamps[txHash] = block.timestamp;
            nonce++;
        }
    }
}
