pragma solidity ^0.4.4;
import "./Proxy.sol";
contract MetaTxController {
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);

string public fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/MetaTxController.sol';

  Proxy public proxy;
  address public userKey;
  address public adminKey;
  uint public referenceNonce;

  modifier only(address key) {  StatementCoverage(fileName,1);
FunctionCoverage(fileName,1);
if (msg.sender == key) {BranchCoverage(fileName,1,0);_;}else { BranchCoverage(fileName,1,1);}
}

  function MetaTxController(address proxyAddress, address _userKey, address _adminKey) {
FunctionCoverage(fileName,2);
Coverage(fileName,13);
     StatementCoverage(fileName,2);
proxy = Proxy(proxyAddress);
Coverage(fileName,14);
     StatementCoverage(fileName,3);
userKey = _userKey;
Coverage(fileName,15);
     StatementCoverage(fileName,4);
adminKey = _adminKey;
Coverage(fileName,16);
     StatementCoverage(fileName,5);
referenceNonce = 0;
  }

  function sendTx(address destination, uint value, bytes data, uint nonce, uint8 v, bytes32 r, bytes32 s) {
FunctionCoverage(fileName,3);

Coverage(fileName,21);
     StatementCoverage(fileName,6);
var h = sha3(destination, bytes32(value), bytes32(nonce), data);
Coverage(fileName,22);
     StatementCoverage(fileName,7);
var addressFromSig = ecrecover(h,v,r,s);
    
Coverage(fileName,24);
     StatementCoverage(fileName,8);
if (nonce == referenceNonce && addressFromSig == userKey) {BranchCoverage(fileName,2,0);
Coverage(fileName,25);
       StatementCoverage(fileName,9);
proxy.forward(destination, value, data);
Coverage(fileName,26);
       StatementCoverage(fileName,10);
referenceNonce += 1;
    }else { BranchCoverage(fileName,2,1);}

  }

  function updateUserKey(address newUserKey) only(adminKey) {
FunctionCoverage(fileName,4);
Coverage(fileName,31);
     StatementCoverage(fileName,11);
userKey = newUserKey;
  }

  function updateAdminKey(address newAdminKey) only(adminKey) {
FunctionCoverage(fileName,5);
Coverage(fileName,35);
     StatementCoverage(fileName,12);
adminKey = newAdminKey;
  }

  function transferOwnership(address newOwner) only(adminKey) {
FunctionCoverage(fileName,6);
    // This will end the functionality of the Ownership contract
    // since it's no longer allowed to forward transactions
    // to the proxy
Coverage(fileName,42);
     StatementCoverage(fileName,13);
proxy.transfer(newOwner);
Coverage(fileName,43);
     StatementCoverage(fileName,14);
suicide(newOwner);
  }

}

