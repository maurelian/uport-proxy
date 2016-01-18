// A Default proxy implementation
// - Only checks that msg.sender is one of n owners

import "Implemenation.sol";

contract OneOfN is Implementation {
    mapping( address => bool ) public owners;

    function OneOfN(address _owner) {
        addOwner(_owner);
    }
    
    modifier onlyOwner() { if (owners[msg.sender]) _ }
    modifier ifOwner(address _owner) { if (owners[_owner]) _ } 
    
    function isOwner(address addr) public returns(bool) { return owners[addr]; }
    
    function addOwner(address _owner) onlyOwner {
        owners[_owner] = true;
    }
    
    function removeOwner(address _owner) onlyOwner {
        owners[_owner] = false;
    }
}
