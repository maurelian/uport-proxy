import "BasicController.sol";

contract RecoveryQuorum {

    BasicController public controller;
    uint public neededSigs;
    mapping(address => bool) public isUser;

    // Temporary variables
    uint public collectedSigs;
    uint public multisigTimeInterval;
    uint public signingId;
    mapping(uint => mapping(address => bool)) public hasSigned;

    address public pendingNewUserKey;

    modifier onlyControllerUser { if (msg.sender == controller.userKey()) _}
    modifier onlyUser { if (isUser[msg.sender]) _}

    function RecoveryQuorum(address controllerAddress, address[] users, uint _neededSigs) {
        controller = BasicController(controllerAddress);
        neededSigs = _neededSigs;

        for (uint i = 0; i < users.length; i++) {
            isUser[users[i]] = true;
        }
    }

    function recoverControllerUser(address newUserKey) onlyUser {
        if (pendingNewUserKey == 0) {
            signingId++;
            pendingNewUserKey = newUserKey;
            collectedSigs++;
            hasSigned[signingId][msg.sender] = true;
        }
        else if (pendingNewUserKey == newUserKey &&
                 !hasSigned[signingId][msg.sender]) {
            collectedSigs++;
            hasSigned[signingId][msg.sender] = true;
        }

        if (collectedSigs >= neededSigs) {
            pendingNewUserKey = 0;
            collectedSigs = 0;

            controller.updateUserKey(newUserKey);
        }
    }

    function addUser(address newUser) onlyControllerUser {
        // WARNING - this function should be implemented with a timelock.
        // The RecoveryQuorum is considered unsafe until that is done.
        isUser[newUser] = true;
    }

    function removeUser(address newUser) onlyControllerUser {
        // WARNING - this function should be implemented with a timelock.
        // The RecoveryQuorum is considered unsafe until that is done.
        isUser[newUser] = false;
    }

    function replaceUser(address newUser, address oldUser) onlyControllerUser {
        // WARNING - this function should be implemented with a timelock.
        // The RecoveryQuorum is considered unsafe until that is done.
        addUser(newUser);
        removeUser(oldUser);
    }

    function updateControllerAdmin(address newAdminKey) onlyControllerUser {
        // WARNING - this function should be implemented with a timelock.
        // The RecoveryQuorum is considered unsafe until that is done.
        // This function could basically be seen as a way to update the RecoveryQuorum.
        controller.updateAdminKey(newAdminKey);
    }

    function upgradeController(address newController) onlyControllerUser {
        // TODO - This might be a good place to initiate an upgrade of the controller
        // However it should be done with a timelock initiated by the creator.
    }
}
