import "Proxy";

contract OwnerWithAdmin {

  Proxy public proxy;
  address public userKey;
  address public adminKey;

  modifier only(address key) { if (msg.sender == key) _}

  function OwnerWithAdmin(address proxyAddress, address _userKey, address _adminKey) {
    proxy = Proxy(proxyAddress);
    userKey = _userKey;
    adminKey = _adminKey;
  }

  function sendTx(address destination, uint value, bytes data) only(userKey) {
    proxy.forward(destination, value, data);
  }

  function updateUserKey(address newUserKey) only(adminKey) {
    userKey = newUserKey;
  }

  function updateAdminKey(address newAdminKey) only(adminKey) {
    adminKey = newAdminKey;
  }

  function transferOwnership(address newOwner) only(adminKey) {
    // This will end the functionality of the Ownership contract
    // since it's no longer allowed to forward transactions
    // to the proxy
    proxy.transfer(newOwner);
    suicide(newOwner);
  }

}

