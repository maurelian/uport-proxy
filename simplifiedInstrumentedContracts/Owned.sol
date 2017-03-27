// A base Owned contract
pragma solidity ^0.4.4;
contract Owned {
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);

string public fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/Owned.sol';

    address public owner;
    modifier onlyOwner(){  StatementCoverage(fileName,1);
FunctionCoverage(fileName,1);
if (isOwner(msg.sender)) {BranchCoverage(fileName,1,0);_;}else { BranchCoverage(fileName,1,1);}
 }
    modifier ifOwner(address sender) {  StatementCoverage(fileName,2);
FunctionCoverage(fileName,2);
if(isOwner(sender)) {BranchCoverage(fileName,2,0);_;}else { BranchCoverage(fileName,2,1);}
 }

    function Owned(){
FunctionCoverage(fileName,3);
Coverage(fileName,9);
         StatementCoverage(fileName,3);
owner = msg.sender;
    }
    
    function isOwner(address addr) public returns(bool) {  StatementCoverage(fileName,4);
FunctionCoverage(fileName,4);
return addr == owner; }

    function transfer(address _owner) onlyOwner {
FunctionCoverage(fileName,5);
Coverage(fileName,15);
         StatementCoverage(fileName,5);
owner = _owner;
    }
}
