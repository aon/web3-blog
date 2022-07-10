import { Signer } from "ethers";
import { createContext, Dispatch, SetStateAction } from "react";

interface AccountContextType {
  address: string;
  signer: Signer;
}

export const initialAccountContext = { address: "", signer: {} as Signer };

export const AccountContext = createContext({
  account: initialAccountContext,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccount: () => {},
} as { account: AccountContextType; setAccount: Dispatch<SetStateAction<AccountContextType>> });
