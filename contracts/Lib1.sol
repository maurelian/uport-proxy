pragma solidity ^0.4.4;
library Lib1{
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);

string public constant fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/Lib1.sol';

    function findAddress(address a, address[] storage arry) returns (int){
FunctionCoverage(fileName, 1);
Coverage(fileName,4);
         StatementCoverage(fileName,1);
for (uint i = 0 ; i < arry.length ; i++){
Coverage(fileName,5);
             StatementCoverage(fileName,2);
if(arry[i] == a){ StatementCoverage(fileName,3);
BranchCoverage(fileName,1,0);return int(i);}else { BranchCoverage(fileName,1,1);}

        }
Coverage(fileName,7);
         StatementCoverage(fileName,4);
return -1;
    }
    function removeAddress(uint i, address[] storage arry){
FunctionCoverage(fileName,2);
Coverage(fileName,10);
         StatementCoverage(fileName,5);
uint lengthMinusOne = arry.length - 1;
Coverage(fileName,11);
         StatementCoverage(fileName,6);
arry[i] = arry[lengthMinusOne];
Coverage(fileName,12);
        delete arry[lengthMinusOne];
Coverage(fileName,13);
         StatementCoverage(fileName,7);
arry.length = lengthMinusOne;
    }
}
