pragma solidity ^0.4.4;
import "RecoveryQuorum.sol";

contract IdentityFactory {
    event IdentityCreated(
        address indexed creator,
        address proxy,
        address controller,
        address recoveryQuorum);

    mapping(address => address) public senderToProxy;

    //cost ~2.4M gas
    function CreateProxyWithControllerAndRecovery(address userKey, address[] delegates, uint longTimeLock, uint shortTimeLock) {
        Proxy proxy = new Proxy();
        RecoverableController controller = new RecoverableController(proxy, userKey, longTimeLock, shortTimeLock);
        proxy.transfer(controller);
        RecoveryQuorum recoveryQuorum = new RecoveryQuorum(controller, delegates);
        controller.changeRecoveryFromRecovery(recoveryQuorum);

        IdentityCreated(msg.sender, proxy, controller, recoveryQuorum);
        senderToProxy[msg.sender] = proxy;
    }
}
