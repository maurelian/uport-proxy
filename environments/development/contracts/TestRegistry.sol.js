"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var TestRegistry = (function (_Pudding) {
    _inherits(TestRegistry, _Pudding);

    function TestRegistry() {
      _classCallCheck(this, TestRegistry);

      _get(Object.getPrototypeOf(TestRegistry.prototype), "constructor", this).apply(this, arguments);
    }

    return TestRegistry;
  })(Pudding);

  ;

  // Set up specific data for this class.
  TestRegistry.abi = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "registry", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "x", "type": "uint256" }], "name": "register", "outputs": [], "type": "function" }];
  TestRegistry.binary = "606060405260738060106000396000f3606060405260e060020a6000350463038defd781146024578063f207564e14603b575b005b606960043560006020819052908152604090205481565b3373ffffffffffffffffffffffffffffffffffffffff16600090815260208190526040902060043590556022565b6060908152602090f3";

  if ("" != "") {
    TestRegistry.address = "";

    // Backward compatibility; Deprecated.
    TestRegistry.deployed_address = "";
  }

  TestRegistry.generated_with = "1.0.3";
  TestRegistry.contract_name = "TestRegistry";

  return TestRegistry;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.TestRegistry = factory;
}