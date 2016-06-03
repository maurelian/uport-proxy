import "Proxy";

contract OwnerWithMultisig {

  Proxy public proxy;
  address[] public users;
  uint public numSigsNeeded;
  mapping(address => bool) public isUser;  
 
  // Temporary variables
  uint public numSigs;
  uint public multisigTimeInterval;
  mapping(address => bool) public hasSigned;

  // Pending transaction
  address public pendingDestination;
  uint public pendingValue;
  bytes public pendingData;

  modifier only(address key) { if (msg.sender == key) _}

  modifier onlyUser { if (isUser[msg.sender]) _}

  function OwnerWithMultisig(address proxyAddress,
                             address[] _users,
                             uint _numSigsNeeded
                            ) {
    proxy = Proxy(proxyAddress);
    users = _users;
    numSigsNeeded = _numSigsNeeded;

    for(uint i=0; i<users.length; i++) {
      isUser[users[i]] = true;
    }
  }

  function sendTx(address destination, uint value, bytes data) onlyUser {
    
    if (numSigs == 0) {
      // First signature
      pendingDestination = destination;
      pendingValue = value;
      pendingData = data;
      hasSigned[msg.sender] = true;
      numSigs++;
    }
    else if (numSigs < numSigsNeeded) {
      // Subsequent signatures
      if (destination == pendingDestination && 
          value == pendingValue &&
          data == pendingData &&
          !hasSigned[msg.sender]) {
        
        hasSigned[msg.sender] = true;
        numSigs++;
      }
    }

    if (numSigs == numSigsNeeded) {
      // All signatures in place,
      // send transaction and reset.
      pendingDestination = 0x0;
      pendingValue = 0;
      pendingData = 0;
      numSigs = 0;
      
      for(uint i=0; i<users.length; i++) {
        hasSigned[users[i]] = false;
      }

      proxy.forward(destination, value, data);
    }

  }

  // function transferOwnership(address newOwner) only(adminKey) {
  //   // This will end the functionality of the Ownership contract
  //   // since it's no longer allowed to forward transactions
  //   // to the proxy
  //   proxy.transfer(newOwner);
  //   suicide(newOwner);
  // }

}

