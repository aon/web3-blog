import { task } from "hardhat/config";
import { Blog } from "../../typechain";
import { getGasFees } from "../utils/gas";

task(
  "fill-with-dummy-posts",
  "Fill contract with dummy data for testing purposes"
)
  .addParam("contract", "Contract address")
  .addOptionalParam("owner", "Private key of the contract owner")
  .setAction(
    async ({ contract, owner }: { contract: string; owner: string }, hre) => {
      // Check if an owner wallet was passed
      // otherwise it will use the default wallet
      let ownerWallet;
      if (owner !== undefined) {
        ownerWallet = new hre.ethers.Wallet(owner, hre.ethers.provider);
      } else {
        console.log("Using internal wallet");
      }

      const blog = (await hre.ethers.getContractAt(
        "Blog",
        contract,
        ownerWallet
      )) as Blog;

      // Create dummy posts
      const posts = [
        {
          title: "Post 1",
          contentHash: "QmViVr1i99qhMtLHRzh6mYKQpcRFT7qDVwsHHaogHUZvCM",
          imageHash: "QmfNmarhMynC6CZzfLoj3Wf8FwzbMMdKPteyZfQeGcGpwm",
        },
        {
          title: "Post 2",
          contentHash: "QmWKrqvMQwRyrpTqynzoUYpd5L8oMJs1rsCn5TJr3Qu3dz",
          imageHash: "QmWkRPncnbL5PKjZhD92b9HJicQa2sfrPghJYqRERBwNCG",
        },
        {
          title: "Post 3",
          contentHash: "QmZLvqAUDM1kFQbQ3BNsnDgjmsoaxrdf7pHkzUfssqfVzW",
          imageHash: "QmWjKsKPzhx43yd2dG8jxZSu4fRTauabZBYoHbLm8n7PHL",
        },
      ];

      const { maxFeePerGas, maxPriorityFeePerGas } = await getGasFees();

      for await (const post of posts) {
        console.log(`Creating post "${post.title}"`);
        const tx = await blog.createPost(
          post.title,
          post.contentHash,
          post.imageHash,
          true,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        await tx.wait();
      }
    }
  );
