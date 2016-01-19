// The core proxy facade
// - is owned by a user or implementation contract
// - only forwards transactions for its owner

import "Owned.sol";

contract Proxy is Owned {
    function forward(address destination, uint value, bytes data) onlyOwner {
        if (!destination.call.value(value)(data)) {
            throw;
        }
    }
}
