// The core proxy facade
// - is owned by a user or implementation contract
// - only forwards transactions for its owner
pragma solidity ^0.4.4;

contract Proxy {
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);

string public fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/Proxy.sol';
    event Forwarded (
        address indexed destination,
        uint value,
        bytes data
    );
    event Received (
        address indexed sender,
        uint value
    );

    function () payable {
FunctionCoverage(fileName,1);
Coverage(fileName,18);
         StatementCoverage(fileName,1);
Received(msg.sender, msg.value);
    }

    function forward(address destination, uint value, bytes data) onlyOwner {
FunctionCoverage(fileName,2);
    	// If a contract tries to CALL or CREATE a contract with either
    	// (i) insufficient balance, or (ii) stack depth already at maximum (1024),
    	// the sub-execution and transfer do not occur at all, no gas gets consumed, and 0 is added to the stack.
    	// see: https://github.com/ethereum/wiki/wiki/Subtleties#exceptional-conditions
Coverage(fileName,26);
         StatementCoverage(fileName,2);
if (!destination.call.value(value)(data)) {BranchCoverage(fileName,1,0);
Coverage(fileName,27);
             StatementCoverage(fileName,3);
throw;
        }else { BranchCoverage(fileName,1,1);}

Coverage(fileName,29);
         StatementCoverage(fileName,4);
Forwarded(destination, value, data);
    }

    address public owner;
    modifier onlyOwner(){  StatementCoverage(fileName,5);
FunctionCoverage(fileName,3);
if (isOwner(msg.sender)) {BranchCoverage(fileName,2,0);_;}else { BranchCoverage(fileName,2,1);}
 }
    modifier ifOwner(address sender) {  StatementCoverage(fileName,6);
FunctionCoverage(fileName,4);
if(isOwner(sender)) {BranchCoverage(fileName,3,0);_;}else { BranchCoverage(fileName,3,1);}
 }

    function Proxy(){
FunctionCoverage(fileName,5);
Coverage(fileName,37);
         StatementCoverage(fileName,7);
owner = msg.sender;
    }
    
    function isOwner(address addr) public returns(bool) {  StatementCoverage(fileName,8);
FunctionCoverage(fileName,6);
return addr == owner; }

    function transfer(address _owner) onlyOwner {
FunctionCoverage(fileName,7);
Coverage(fileName,43);
         StatementCoverage(fileName,9);
owner = _owner;
    }
}
