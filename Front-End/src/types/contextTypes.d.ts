import { IProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

export {};

declare global {
  interface AuthContextType {
    web3Auth: Web3Auth | null;
    setWeb3Auth: (web3Auth: Web3Auth | null) => void;
    provider: IProvider | null;
    setProvider: (provider: IProvider | null) => void;
    isInitialized: boolean;
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    userWallet: Wallet | null;
    loadingUserInfo: boolean;
    setLoadingUserInfo: (loadingUserInfo: boolean) => void;
    login: () => void;
  }
}
