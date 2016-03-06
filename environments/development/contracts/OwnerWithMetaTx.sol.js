"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var OwnerWithMetaTx = (function (_Pudding) {
    _inherits(OwnerWithMetaTx, _Pudding);

    function OwnerWithMetaTx() {
      _classCallCheck(this, OwnerWithMetaTx);

      _get(Object.getPrototypeOf(OwnerWithMetaTx.prototype), "constructor", this).apply(this, arguments);
    }

    return OwnerWithMetaTx;
  })(Pudding);

  ;

  // Set up specific data for this class.
  OwnerWithMetaTx.abi = [{ "constant": true, "inputs": [], "name": "userKey", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "newUserKey", "type": "address" }], "name": "updateUserKey", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "adminKey", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": true, "inputs": [], "name": "referenceNonce", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "destination", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" }, { "name": "nonce", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" }], "name": "sendTx", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "proxy", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdminKey", "type": "address" }], "name": "updateAdminKey", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "type": "function" }, { "inputs": [{ "name": "proxyAddress", "type": "address" }, { "name": "_userKey", "type": "address" }, { "name": "_adminKey", "type": "address" }], "type": "constructor" }];
  OwnerWithMetaTx.binary = "606060405260405160608061043883395060c06040525160805160a05160008054600160a060020a0319908116851782556001805482168517905560028054909116831790556003555050506103df806100596000396000f36060604052361561006c5760e060020a60003504631c1c2289811461006e5780632281dad614610080578063233044d0146100c25780636e7b6746146100d4578063df265a3b146100dd578063ec556889146102eb578063ec57ef82146102fd578063f2fde38b1461033e575b005b6103c2600154600160a060020a031681565b61006c600435600254600160a060020a039081169033168114156100be576001805473ffffffffffffffffffffffffffffffffffffffff1916831790555b5050565b6103c2600254600160a060020a031681565b6103d560035481565b60806020604435600481810135601f81018490049093028401604052606083815261006c948235946024803595606494939101919081908382808284375094965050933593505060843591505060a43560c43560006000888860010287600102896040518085600160a060020a03166c010000000000000000000000000281526014018481526020018381526020018280519060200190808383829060006004602084601f0104600302600f01f15090500194505050505060405180910390209150600182868686604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051808303816000866161da5a03f11561000257505060405151600354909150861480156102085750600154600160a060020a038281169116145b156102e057600060009054906101000a9004600160a060020a0316600160a060020a031663d7f31eb98a8a8a6040518460e060020a0281526004018084600160a060020a03168152602001838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102b55780820380516001836020036101000a031916815260200191505b509450505050506000604051808303816000876161da5a03f115610002575050600380546001019055505b505050505050505050565b6103c2600054600160a060020a031681565b61006c600435600254600160a060020a039081169033168114156100be576002805473ffffffffffffffffffffffffffffffffffffffff1916831790555050565b61006c600435600254600160a060020a039081169033168114156100be57600080547f1a695230000000000000000000000000000000000000000000000000000000006060908152600160a060020a038086166064529190911691631a695230916084919060248183876161da5a03f1156100025750505081600160a060020a0316ff5b600160a060020a03166060908152602090f35b6060908152602090f3";

  if ("" != "") {
    OwnerWithMetaTx.address = "";

    // Backward compatibility; Deprecated.
    OwnerWithMetaTx.deployed_address = "";
  }

  OwnerWithMetaTx.generated_with = "1.0.3";
  OwnerWithMetaTx.contract_name = "OwnerWithMetaTx";

  return OwnerWithMetaTx;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.OwnerWithMetaTx = factory;
}