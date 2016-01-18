// A Default proxy implementation
// - Only checks that msg.sender is the owner

import "../src/Proxy.sol";

contract Implementation is Owned {
    function proxy(address proxy, address destination, uint value, bytes data) ifOwner(msg.sender) {
        Proxy(proxy).forward(destination, value, data);
    }
}
