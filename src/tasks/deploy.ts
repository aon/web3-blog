import { task } from "hardhat/config";
import { getGasFees } from "../utils/gas";

task("deploy", "Deploy contract to the blockchain")
  .addOptionalParam("owner", "Private key of the contract owner")
  .setAction(async ({ owner }: { owner: string }, hre) => {
    // Compile contract just in case
    await hre.run("compile");

    // Check if an owner wallet was passed
    // otherwise it will use the default wallet
    let ownerWallet;
    if (owner !== undefined) {
      ownerWallet = new hre.ethers.Wallet(owner, hre.ethers.provider);
    } else {
      console.log("Deploying with internal wallet");
    }

    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasFees();

    const Contract = await hre.ethers.getContractFactory("Blog", ownerWallet);
    const contract = await Contract.deploy("Web3 Blog", {
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
    await contract.deployed();

    const contractAddress = contract.address;
    const ownerAddress = await contract.signer.getAddress();

    console.log("Contract deployed to:", contractAddress);
    console.log("Contract owner:", ownerAddress);
  });
