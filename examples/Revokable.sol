// A Custom proxy implementation
// - Checks that msg.sender is the owner.
// - Allows ownership to be revoked and reclaimed using a passphrase scheme

import "Implementation.sol";

contract Revokable is Implementation {
    address previousOwner;
    uint8 revokableV;
    bytes32 revokableR;
    bytes32 revokableS;
    
    // In order to make a contracts ownership revokeable you must
    // provide a signature VRS of a master passphrase which has been
    // hashed using SHA3 twice. This can only be done by the current owner.
    function makeRevokable(uint8 _v, bytes32 _r, bytes32 _s) onlyOwner {
        revokableV = _v;
        revokableR = _r;
        revokableS = _s;
    }
    
    // All that is needed to revoke ownership of the contract is the twice
    // hashed passphrase, which can be submitted by any sender.
    function revoke(bytes32 twiceHashedPassphrase) returns (bool success) {
        if (revokableV != uint8(0)
        && owner != address(0)
        && ecrecover(twiceHashedPassphrase, revokableV, revokableR, revokableS) == owner) {
            previousOwner = owner;
            owner = address(0);
            return true;
        }
    }
    
    // In order to reclaim ownership of a contract who's ownership has been revoked
    // You need to be able to provide a once hashed version of the passphrase.
    function reclaim(bytes32 onceHashedPassphrase) {
        bytes32 data = sha3(onceHashedPassphrase);
        address signer = ecrecover(data, revokableV, revokableR, revokableS);
        if (signer == previousOwner) owner = msg.sender;
    }
}
