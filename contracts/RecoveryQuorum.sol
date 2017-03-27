pragma solidity ^0.4.4;
import "./RecoverableController.sol";
import "./Lib1.sol";

contract RecoveryQuorum {
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);
    RecoverableController public controller;

    string public fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/RecoveryQuorum.sol';

    address[] public delegateAddresses; // needed for iteration of mapping
    mapping (address => Delegate) public delegates;
    struct Delegate{
        uint deletedAfter; // delegate exists if not 0
        uint pendingUntil;
        address proposedUserKey;
    }

    event RecoveryEvent(string action, address initiatedBy);

    modifier onlyUserKey(){  StatementCoverage(fileName,1);
FunctionCoverage(fileName,1);
if (msg.sender == controller.userKey()) {BranchCoverage(fileName,1,0);_;}else { BranchCoverage(fileName,1,1);}
 }

    function RecoveryQuorum(address _controller, address[] _delegates){
FunctionCoverage(fileName,2);
Coverage(fileName,21);
         StatementCoverage(fileName,2);
controller = RecoverableController(_controller);
Coverage(fileName,22);
         StatementCoverage(fileName,3);
for(uint i = 0; i < _delegates.length; i++){
Coverage(fileName,23);
             StatementCoverage(fileName,4);
delegateAddresses.push(_delegates[i]);
Coverage(fileName,24);
             StatementCoverage(fileName,5);
delegates[_delegates[i]] = Delegate({proposedUserKey: 0x0, pendingUntil: 0, deletedAfter: 31536000000000});
        }
    }
    function signUserChange(address proposedUserKey) {
FunctionCoverage(fileName,3);
Coverage(fileName,28);
         StatementCoverage(fileName,6);
if(delegateRecordExists(delegates[msg.sender])) {BranchCoverage(fileName,2,0);
Coverage(fileName,29);
             StatementCoverage(fileName,7);
delegates[msg.sender].proposedUserKey = proposedUserKey;
Coverage(fileName,30);
             StatementCoverage(fileName,8);
changeUserKey(proposedUserKey);
Coverage(fileName,31);
             StatementCoverage(fileName,9);
RecoveryEvent("signUserChange", msg.sender);
        }else { BranchCoverage(fileName,2,1);}

    }
    function changeUserKey(address newUserKey) {
FunctionCoverage(fileName,4);
Coverage(fileName,35);
         StatementCoverage(fileName,10);
if(collectedSignatures(newUserKey) >= neededSignatures()){BranchCoverage(fileName,3,0);
Coverage(fileName,36);
             StatementCoverage(fileName,11);
controller.changeUserKeyFromRecovery(newUserKey);
Coverage(fileName,37);
             StatementCoverage(fileName,12);
for(uint i = 0 ; i < delegateAddresses.length ; i++){
                //remove any pending delegates after a recovery
Coverage(fileName,39);
                 StatementCoverage(fileName,13);
if(delegates[delegateAddresses[i]].pendingUntil > now){BranchCoverage(fileName,4,0); 
Coverage(fileName,40);
                     StatementCoverage(fileName,14);
delegates[delegateAddresses[i]].deletedAfter = now;
                }else { BranchCoverage(fileName,4,1);}

Coverage(fileName,42);
                delete delegates[delegateAddresses[i]].proposedUserKey;
            }
        }else { BranchCoverage(fileName,3,1);}

    }

    function replaceDelegates(address[] delegatesToRemove, address[] delegatesToAdd) onlyUserKey{
FunctionCoverage(fileName,5);
Coverage(fileName,48);
         StatementCoverage(fileName,15);
for(uint i = 0 ; i < delegatesToRemove.length ; i++){
Coverage(fileName,49);
             StatementCoverage(fileName,16);
removeDelegate(delegatesToRemove[i]);
        }
Coverage(fileName,51);
         StatementCoverage(fileName,17);
garbageCollect();
Coverage(fileName,52);
         StatementCoverage(fileName,18);
for(uint j = 0 ; j < delegatesToAdd.length ; j++){
Coverage(fileName,53);
             StatementCoverage(fileName,19);
addDelegate(delegatesToAdd[j]);
        }
Coverage(fileName,55);
         StatementCoverage(fileName,20);
RecoveryEvent("replaceDelegates", msg.sender);
    }
    function collectedSignatures(address _proposedUserKey) returns (uint signatures){
FunctionCoverage(fileName,6);
Coverage(fileName,58);
         StatementCoverage(fileName,21);
for(uint i = 0 ; i < delegateAddresses.length ; i++){
Coverage(fileName,59);
             StatementCoverage(fileName,22);
if (delegateHasValidSignature(delegates[delegateAddresses[i]]) && delegates[delegateAddresses[i]].proposedUserKey == _proposedUserKey){BranchCoverage(fileName,5,0);
Coverage(fileName,60);
                signatures++;
            }else { BranchCoverage(fileName,5,1);}

        }
    }

    function getAddresses() constant returns (address[]){  StatementCoverage(fileName,23);
FunctionCoverage(fileName,7);
return delegateAddresses; }

    function neededSignatures() returns (uint){
FunctionCoverage(fileName,8);
        uint currentDelegateCount; //always 0 at this point
Coverage(fileName,69);
         StatementCoverage(fileName,24);
for(uint i = 0 ; i < delegateAddresses.length ; i++){
Coverage(fileName,70);
             StatementCoverage(fileName,25);
if(delegateIsCurrent(delegates[delegateAddresses[i]])){BranchCoverage(fileName,6,0); currentDelegateCount++; }else { BranchCoverage(fileName,6,1);}

        }
Coverage(fileName,72);
         StatementCoverage(fileName,26);
return currentDelegateCount/2 + 1;
    }
    function addDelegate(address delegate) private {
FunctionCoverage(fileName,9);
Coverage(fileName,75);
         StatementCoverage(fileName,27);
if(!delegateRecordExists(delegates[delegate]) && delegateAddresses.length < 15) {BranchCoverage(fileName,7,0);
Coverage(fileName,76);
             StatementCoverage(fileName,28);
delegates[delegate] = Delegate({proposedUserKey: 0x0, pendingUntil: now + controller.longTimeLock(), deletedAfter: 31536000000000});
Coverage(fileName,77);
             StatementCoverage(fileName,29);
delegateAddresses.push(delegate);
        }else { BranchCoverage(fileName,7,1);}

    }
    function removeDelegate(address delegate) private {
FunctionCoverage(fileName,10);
Coverage(fileName,81);
         StatementCoverage(fileName,30);
if(delegates[delegate].deletedAfter > controller.longTimeLock() + now){BranchCoverage(fileName,8,0); 
            //remove right away if they are still pending
Coverage(fileName,83);
             StatementCoverage(fileName,31);
if(delegates[delegate].pendingUntil > now){BranchCoverage(fileName,9,0); 
Coverage(fileName,84);
                 StatementCoverage(fileName,32);
delegates[delegate].deletedAfter = now;
            } else{BranchCoverage(fileName,9,1);
Coverage(fileName,86);
                 StatementCoverage(fileName,33);
delegates[delegate].deletedAfter = controller.longTimeLock() + now;
            }
        }else { BranchCoverage(fileName,8,1);}

    }
    function garbageCollect() private{
FunctionCoverage(fileName,11);
Coverage(fileName,91);
         StatementCoverage(fileName,34);
uint i = 0;
Coverage(fileName,92);
         StatementCoverage(fileName,35);
while(i < delegateAddresses.length){
Coverage(fileName,93);
             StatementCoverage(fileName,36);
if(delegateIsDeleted(delegates[delegateAddresses[i]])){BranchCoverage(fileName,10,0);
Coverage(fileName,94);
                 StatementCoverage(fileName,37);
delegates[delegateAddresses[i]].deletedAfter = 0;
Coverage(fileName,95);
                 StatementCoverage(fileName,38);
delegates[delegateAddresses[i]].pendingUntil = 0;
Coverage(fileName,96);
                 StatementCoverage(fileName,39);
delegates[delegateAddresses[i]].proposedUserKey = 0;
Coverage(fileName,97);
                 StatementCoverage(fileName,40);
Lib1.removeAddress(i, delegateAddresses);
            }else{BranchCoverage(fileName,10,1);i++;}
        }
    }
    function delegateRecordExists(Delegate d) private returns (bool){
FunctionCoverage(fileName,12);
Coverage(fileName,102);
         StatementCoverage(fileName,41);
return d.deletedAfter != 0;
    }
    function delegateIsDeleted(Delegate d) private returns (bool){
FunctionCoverage(fileName,13);
         StatementCoverage(fileName,42);
return d.deletedAfter <= now; //doesnt check record existence
    }
    function delegateIsCurrent(Delegate d) private returns (bool){
FunctionCoverage(fileName,14);
Coverage(fileName,108);
         StatementCoverage(fileName,43);
return delegateRecordExists(d) && !delegateIsDeleted(d) && now > d.pendingUntil;
    }
    function delegateHasValidSignature(Delegate d) private returns (bool){
FunctionCoverage(fileName,15);
Coverage(fileName,111);
         StatementCoverage(fileName,44);
return delegateIsCurrent(d) && d.proposedUserKey != 0x0;
    }
}
