"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Owned = (function (_Pudding) {
    _inherits(Owned, _Pudding);

    function Owned() {
      _classCallCheck(this, Owned);

      _get(Object.getPrototypeOf(Owned.prototype), "constructor", this).apply(this, arguments);
    }

    return Owned;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Owned.abi = [{ "constant": false, "inputs": [{ "name": "_owner", "type": "address" }], "name": "transfer", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "addr", "type": "address" }], "name": "isOwner", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "inputs": [], "type": "constructor" }];
  Owned.binary = "606060405260008054600160a060020a0319163317905560bb8060226000396000f3606060405260e060020a60003504631a6952308114602e5780632f54bf6e14603a5780638da5cb5b146054575b005b602c6004356094336040565b60656004355b600054600160a060020a0390811691161490565b6077600054600160a060020a031681565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b1560b8576000805473ffffffffffffffffffffffffffffffffffffffff1916821790555b5056";

  if ("" != "") {
    Owned.address = "";

    // Backward compatibility; Deprecated.
    Owned.deployed_address = "";
  }

  Owned.generated_with = "1.0.3";
  Owned.contract_name = "Owned";

  return Owned;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Owned = factory;
}