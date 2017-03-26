module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }, 
    test: {
      host: "localhost",
      port: 8545,
      network_id: "*", 
      gasPrice: 0x2,
      gas: 0xffffffff, // added an extra f. TestRPC has 0xfffffffffffff
    }
  }
};
