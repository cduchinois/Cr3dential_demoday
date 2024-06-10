require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "xrplEvmSidechain",//"hardhat",
  networks: {
    xrplEvmSidechain: {
      url: "https://rpc-evm-sidechain.xrpl.org",
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan _
    // Obtain one at https://etherscan.io/ or https://polygonscan.com/
    apiKey: { sepolia: process.env.ETHERSCAN_API_KEY }
  }
};