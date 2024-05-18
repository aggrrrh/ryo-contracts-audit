import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-ignition-ethers"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-web3"
import "dotenv/config"
import "./tasks/payload"
import "./tasks/merkle-tree"

const { INFURA_API_KEY, SEPOLIA_PRIVATE_KEY, MAINNET_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

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
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + INFURA_API_KEY,
      accounts: [`${SEPOLIA_PRIVATE_KEY}`],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + INFURA_API_KEY,
      accounts: [`${MAINNET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: false,
  }
}

export default config;
