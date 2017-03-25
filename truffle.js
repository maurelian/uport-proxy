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
      gasPrice: 20e9,
      gas: 0xfffffffffff,
    }
  }
};
