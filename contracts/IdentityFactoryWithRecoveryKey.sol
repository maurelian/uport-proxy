pragma solidity ^0.4.4;
import "./RecoverableController.sol";

contract IdentityFactoryWithRecoveryKey {
event Coverage(string fileName, uint256 lineNumber);
event FunctionCoverage(string fileName, uint256 fnId);
event StatementCoverage(string fileName, uint256 statementId);
event BranchCoverage(string fileName, uint256 branchId, uint256 locationIdx);

string public constant fileName = '/Users/primary/Projects/uport-security/proxy-coverage/originalContracts/IdentityFactoryWithRecoveryKey.sol';
    event IdentityCreated(
        address indexed userKey,
        address proxy,
        address controller,
        address recoveryKey);

    mapping(address => address) public senderToProxy;

    //cost ~2.4M gas
    function CreateProxyWithControllerAndRecoveryKey(address userKey, address _recoveryKey, uint longTimeLock, uint shortTimeLock) {
FunctionCoverage(fileName,1);
Coverage(fileName,15);
         StatementCoverage(fileName,1);
Proxy proxy = new Proxy();
Coverage(fileName,16);
         StatementCoverage(fileName,2);
RecoverableController controller = new RecoverableController(proxy, userKey, longTimeLock, shortTimeLock);
Coverage(fileName,17);
         StatementCoverage(fileName,3);
proxy.transfer(controller);
Coverage(fileName,18);
         StatementCoverage(fileName,4);
controller.changeRecoveryFromRecovery(_recoveryKey);

Coverage(fileName,20);
         StatementCoverage(fileName,5);
IdentityCreated(userKey, proxy, controller, _recoveryKey);
Coverage(fileName,21);
         StatementCoverage(fileName,6);
senderToProxy[msg.sender] = proxy;
    }
}
