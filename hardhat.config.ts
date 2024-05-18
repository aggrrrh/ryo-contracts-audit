import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-ignition-ethers"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-web3"
import './tasks/payload'

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200 // runtime optimized
      }
    }
  },
};

export default config;
