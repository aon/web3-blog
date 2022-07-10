import { AccountContext } from "../../context/account-context";
import Web3Modal from "web3modal";
import { useContext } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, Signer } from "ethers";
import { shortenAddress } from "../../utils/wallet";
import { changeNetworkToMumbai, isNetworkMumbai } from "../../utils/blockchain";

const ConnectWalletButton = () => {
  const { account, setAccount } = useContext(AccountContext);

  const getWeb3Modal = () => {
    const web3Modal = new Web3Modal({
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
            chainId: 80001,
            rpc: {
              80001: process.env.NEXT_PUBLIC_PROVIDER,
            },
          },
        },
      },
    });
    return web3Modal;
  };

  const connect = async () => {
    try {
      const web3Modal = getWeb3Modal();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const connection = await web3Modal.connect();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const provider = new ethers.providers.Web3Provider(connection);
      if (!(await isNetworkMumbai(provider))) {
        await changeNetworkToMumbai(provider);
      }
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      setAccount({ address: accounts[0], signer });
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = () => {
    const web3Modal = getWeb3Modal();
    web3Modal.clearCachedProvider();
    setAccount({ address: "", signer: {} as Signer });
  };

  return (
    <>
      {account.address ? (
        <button
          className="btn btn-accent btn-sm mr-3 text-xs lowercase"
          onClick={disconnect}
        >
          {shortenAddress(account.address)}
        </button>
      ) : (
        <button
          className="btn btn-sm mr-3 text-xs"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={connect}
        >
          Connect wallet
        </button>
      )}
    </>
  );
};

export default ConnectWalletButton;
