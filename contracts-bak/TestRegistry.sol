pragma solidity ^0.4.4;
contract TestRegistry {

  mapping(address => uint) public registry;

  function register(uint x) {
    registry[msg.sender] = x;
  }

  function testThrow() {
      throw;
  }

}
