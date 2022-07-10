import { ethers, Signer } from "ethers";
import BlogArtifacts from "../../artifacts/src/contracts/Blog.sol/Blog.json";
import { Blog } from "../../typechain";
import { Provider, Web3Provider } from "@ethersproject/providers";

export const getContract = (signerOrProvider?: Provider | Signer) => {
  if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
    throw new Error("Missing contract address");
  }

  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    BlogArtifacts.abi,
    signerOrProvider || provider
  ) as Blog;
  return contract;
};

export const isNetworkMumbai = async (provider: Provider) => {
  const network = await provider.getNetwork();
  return network.chainId === 80001;
};

export const changeNetworkToMumbai = async (provider: Web3Provider) => {
  if (!provider.provider.request) {
    throw new Error("Provider not supported");
  }
  try {
    await provider.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  } catch (err) {
    throw new Error(
      "Unable to switch network to Mumbai, your wallet might not be supported."
    );
  }
};
