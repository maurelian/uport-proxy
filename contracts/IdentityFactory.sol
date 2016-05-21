import "Proxy";
import "OwnerWithAdmin";

contract IdentityFactory {
    event IdentityCreated(
        address indexed creator,
        address proxy,
        address controller
    );

    mapping(address => address) public senderToProxy;

    function CreateProxyWithController(address userKey, address adminKey) {
        Proxy proxy = new Proxy();
        OwnerWithAdmin controller = new OwnerWithAdmin(proxy, userKey, adminKey);
        proxy.transfer(controller);

        IdentityCreated(msg.sender, proxy, controller);
        senderToProxy[msg.sender] = proxy;
    }
}
