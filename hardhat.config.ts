import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

// Tasks
import "./src/tasks/deploy";
import "./src/tasks/fill-with-dummy-posts";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/QJKR7JpwOQWyyUvvMxohQjMsoBSytR-m",
      accounts: [
        "efb0841988c90f901fbc5c99f8c0485820321a245f5ec338c2c15c99d2f7ab9b",
      ],
    },
  },
  paths: {
    sources: "./src/contracts",
    tests: "./src/test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "WRD69H643FUUGNYNRYVTKI2KM9G5QPFI86",
    },
  },
};

export default config;
