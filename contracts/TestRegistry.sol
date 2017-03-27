pragma solidity ^0.4.4;
contract TestRegistry {
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);

string public fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/TestRegistry.sol';

  mapping(address => uint) public registry;

  function register(uint x) {
FunctionCoverage(fileName,1);
Coverage(fileName,7);
     StatementCoverage(fileName,1);
registry[msg.sender] = x;
  }

  function testThrow() {
FunctionCoverage(fileName,2);
Coverage(fileName,11);
       StatementCoverage(fileName,2);
throw;
  }

}
