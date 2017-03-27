pragma solidity ^0.4.4;
import "./Proxy.sol";

contract RecoverableController {
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);

    string public fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/RecoverableController.sol';
    uint    public version;
    Proxy   public proxy;
    
    address public userKey;
    address public proposedUserKey;
    uint    public proposedUserKeyPendingUntil;

    address public recoveryKey;
    address public proposedRecoveryKey;
    uint    public proposedRecoveryKeyPendingUntil;

    address public proposedController;
    uint    public proposedControllerPendingUntil;

    uint    public shortTimeLock;// use 900 for 15 minutes
    uint    public longTimeLock; // use 259200 for 3 days

    event RecoveryEvent(string action, address initiatedBy);

    modifier onlyUserKey() {  StatementCoverage(fileName,1);
FunctionCoverage(fileName,1);
if (msg.sender == userKey) {BranchCoverage(fileName,1,0);_;}else { BranchCoverage(fileName,1,1);}
 }
    modifier onlyRecoveryKey() {  StatementCoverage(fileName,2);
FunctionCoverage(fileName,2);
if (msg.sender == recoveryKey) {BranchCoverage(fileName,2,0);_;}else { BranchCoverage(fileName,2,1);}
 }

    function RecoverableController(address proxyAddress, address _userKey, uint _longTimeLock, uint _shortTimeLock) {
FunctionCoverage(fileName,3);
Coverage(fileName,28);
         StatementCoverage(fileName,3);
version = 1;
Coverage(fileName,29);
         StatementCoverage(fileName,4);
proxy = Proxy(proxyAddress);
Coverage(fileName,30);
         StatementCoverage(fileName,5);
userKey = _userKey;
Coverage(fileName,31);
         StatementCoverage(fileName,6);
shortTimeLock = _shortTimeLock;
Coverage(fileName,32);
         StatementCoverage(fileName,7);
longTimeLock = _longTimeLock;
Coverage(fileName,33);
         StatementCoverage(fileName,8);
recoveryKey = msg.sender;
    }

    function forward(address destination, uint value, bytes data) onlyUserKey {
FunctionCoverage(fileName,4);
Coverage(fileName,37);
         StatementCoverage(fileName,9);
proxy.forward(destination, value, data);
    }
    //pass 0x0 to cancel 
    function signRecoveryChange(address _proposedRecoveryKey) onlyUserKey{
FunctionCoverage(fileName,5);
Coverage(fileName,41);
         StatementCoverage(fileName,10);
proposedRecoveryKeyPendingUntil = now + longTimeLock;
Coverage(fileName,42);
         StatementCoverage(fileName,11);
proposedRecoveryKey = _proposedRecoveryKey;
Coverage(fileName,43);
         StatementCoverage(fileName,12);
RecoveryEvent("signRecoveryChange", msg.sender);
    }
    function changeRecovery() {
FunctionCoverage(fileName,6);
Coverage(fileName,46);
         StatementCoverage(fileName,13);
if(proposedRecoveryKeyPendingUntil < now && proposedRecoveryKey != 0x0){BranchCoverage(fileName,3,0);
Coverage(fileName,47);
             StatementCoverage(fileName,14);
recoveryKey = proposedRecoveryKey;
Coverage(fileName,48);
            delete proposedRecoveryKey;
        }else { BranchCoverage(fileName,3,1);}

    }
    //pass 0x0 to cancel 
    function signControllerChange(address _proposedController) onlyUserKey{
FunctionCoverage(fileName,7);
Coverage(fileName,53);
         StatementCoverage(fileName,15);
proposedControllerPendingUntil = now + longTimeLock;
Coverage(fileName,54);
         StatementCoverage(fileName,16);
proposedController = _proposedController;
Coverage(fileName,55);
         StatementCoverage(fileName,17);
RecoveryEvent("signControllerChange", msg.sender);
    }
    function changeController() {
FunctionCoverage(fileName,8);
Coverage(fileName,58);
         StatementCoverage(fileName,18);
if(proposedControllerPendingUntil < now && proposedController != 0x0){BranchCoverage(fileName,4,0);
Coverage(fileName,59);
             StatementCoverage(fileName,19);
proxy.transfer(proposedController);
Coverage(fileName,60);
             StatementCoverage(fileName,20);
suicide(proposedController);
        }else { BranchCoverage(fileName,4,1);}

    }
    //pass 0x0 to cancel 
    function signUserKeyChange(address _proposedUserKey) onlyUserKey{
FunctionCoverage(fileName,9);
Coverage(fileName,65);
         StatementCoverage(fileName,21);
proposedUserKeyPendingUntil = now + shortTimeLock;
Coverage(fileName,66);
         StatementCoverage(fileName,22);
proposedUserKey = _proposedUserKey;
Coverage(fileName,67);
         StatementCoverage(fileName,23);
RecoveryEvent("signUserKeyChange", msg.sender);
    }
    function changeUserKey(){
FunctionCoverage(fileName,10);
Coverage(fileName,70);
         StatementCoverage(fileName,24);
if(proposedUserKeyPendingUntil < now && proposedUserKey != 0x0){BranchCoverage(fileName,5,0);
Coverage(fileName,71);
             StatementCoverage(fileName,25);
userKey = proposedUserKey;
Coverage(fileName,72);
            delete proposedUserKey;
Coverage(fileName,73);
             StatementCoverage(fileName,26);
RecoveryEvent("changeUserKey", msg.sender);
        }else { BranchCoverage(fileName,5,1);}

    }
    
    function changeRecoveryFromRecovery(address _recoveryKey) onlyRecoveryKey{  StatementCoverage(fileName,27);
FunctionCoverage(fileName,11);
recoveryKey = _recoveryKey; }
    function changeUserKeyFromRecovery(address _userKey) onlyRecoveryKey{
FunctionCoverage(fileName,12);
Coverage(fileName,79);
        delete proposedUserKey;
Coverage(fileName,80);
         StatementCoverage(fileName,28);
userKey = _userKey;
    }
}

