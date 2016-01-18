// A Custom proxy implementation
// - Takes transaction executes it and refunds gas cost.

import "Implementaion.sol";

contract Refunder is Implementaion {
    uint nonce;
    
    function proxy(address proxy, address destination, uint value, bytes data, bytes32 txHash, v, r, s) {
        if (sha3(destination, value, data, nonce) == txHash && isOwner(ecrecover(txHash, v, r, s)) {
            Proxy(proxy).forward(destination, value, data);
            nonce++;
            // TODO: send gas-used to msg.sender
        }
    }
}
