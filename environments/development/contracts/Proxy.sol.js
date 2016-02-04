"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Proxy = (function (_Pudding) {
    _inherits(Proxy, _Pudding);

    function Proxy() {
      _classCallCheck(this, Proxy);

      _get(Object.getPrototypeOf(Proxy.prototype), "constructor", this).apply(this, arguments);
    }

    return Proxy;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Proxy.abi = [{ "constant": false, "inputs": [{ "name": "_owner", "type": "address" }], "name": "transfer", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "addr", "type": "address" }], "name": "isOwner", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "destination", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "forward", "outputs": [], "type": "function" }];
  Proxy.binary = "606060405260008054600160a060020a031916331790556101ab806100246000396000f3606060405260e060020a60003504631a695230811461003c5780632f54bf6e1461004b5780638da5cb5b14610066578063d7f31eb914610078575b005b61003a6004356100fc33610052565b6100cd6004355b600054600160a060020a0390811691161490565b6100df600054600160a060020a031681565b604080516020600460443581810135601f810184900484028501840190955284845261003a94823594602480359560649492939190920191819084018382808284375094965050505050505061012433610052565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b15610121576000805473ffffffffffffffffffffffffffffffffffffffff1916821790555b50565b156101a65782600160a060020a03168282604051808280519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156101825780820380516001836020036101000a031916815260200191505b5091505060006040518083038185876185025a03f19250505015156101a657610002565b50505056";

  if ("" != "") {
    Proxy.address = "";

    // Backward compatibility; Deprecated.
    Proxy.deployed_address = "";
  }

  Proxy.generated_with = "1.0.3";
  Proxy.contract_name = "Proxy";

  return Proxy;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Proxy = factory;
}