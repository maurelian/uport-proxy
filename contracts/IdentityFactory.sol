import "Proxy.sol";
import "OwnerWithAdmin.sol";

contract IdentityFactory {
    event IdentityCreated(
        address indexed creator,
        address proxy,
        address controller
    );

    function CreateProxyWithController(address userKey, address adminKey) returns (address, address) {
        Proxy proxy = new Proxy();
        OwnerWithAdmin controller = new OwnerWithAdmin(proxy, userKey, adminKey);
        proxy.transfer(controller);

        IdentityCreated(msg.sender, proxy, controller);
        return (proxy, controller);
    }
}
