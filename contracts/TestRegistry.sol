contract TestRegistry {

  mapping(address => uint) public registry;

  function register(uint x) {
    registry[msg.sender] = x;
  }

}
