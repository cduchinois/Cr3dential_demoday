/* eslint-disable @typescript-eslint/no-empty-function */
import { IProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { createContext, useEffect, useState } from 'react';

import { instantiateWeb3Auth, openloginAdapter } from '@/lib/web3Auth';
import XrplRPC from '@/lib/xrpl-rpc';

import { createIssuerDID, createStudentDID } from '@/backend/DID-back';

export const AuthContext = createContext<AuthContextType>({
  web3Auth: null,
  setWeb3Auth: () => {},
  provider: null,
  setProvider: () => {},
  isInitialized: false,
  userWallet: null,
  isLogged: false,
  setIsLogged: () => {},
  loadingUserInfo: false,
  setLoadingUserInfo: () => {},
  login: () => {},
  createDid: () => {},
  createIssuerDid: () => {},
});

export const Web3AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userWallet, setUserWallet] = useState<Wallet | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [xrplRPC, setXrplRPC] = useState<XrplRPC | null>(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  const onLogin = async () => {};

  useEffect(() => {
    if (!isInitialized) {
      const init = async () => {
        if (!web3Auth) {
          const newWeb3Auth = instantiateWeb3Auth();
          newWeb3Auth.configureAdapter(openloginAdapter);
          await newWeb3Auth.initModal();
          setWeb3Auth(newWeb3Auth);
          console.log('🚀 ~ init ~ newWeb3Auth:', newWeb3Auth);
          setIsInitialized(true);

          if (newWeb3Auth.connected) {
            setProvider(newWeb3Auth.provider);
            setIsLogged(true);
          }
        }
      };
      init();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isLogged && provider) {
      setLoadingUserInfo(true);
      const newXrplRPC = new XrplRPC(provider);
      setXrplRPC(newXrplRPC);
      newXrplRPC
        .getAccounts()
        .then((accounts) => {
          console.log('🚀 ~ newXrplRPC.getAccounts ~ accounts:', accounts);
          setUserWallet({
            address: accounts.account,
          });
        })
        .finally(() => {
          setLoadingUserInfo(false);
        });
    }
  }, [isLogged, provider]);

  const login = async () => {
    if (web3Auth) {
      const provider = await web3Auth.connect();
      setProvider(provider);
      setIsLogged(true);
    }
  };

  const createDid = async (issuerWallet: string, publicKeyHex: string) => {
    if (!provider || !xrplRPC) {
      console.error('Provider or xrplRPC not initialized');
      return;
    }

    const testIPFS = await createStudentDID(issuerWallet, publicKeyHex);
    const result = await xrplRPC.signAndSetDid(testIPFS);

    return result;
  };

  const createIssuerDid = async (
    issuerWallet: string,
    publicKeyHex: string
  ) => {
    if (!provider || !xrplRPC) {
      console.error('Provider or xrplRPC not initialized');
      return;
    }

    const testIPFS = await createIssuerDID(issuerWallet, publicKeyHex);
    const result = await xrplRPC.signAndSetDid(testIPFS);

    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        web3Auth,
        setWeb3Auth,
        provider,
        setProvider,
        isInitialized: isInitialized,
        userWallet,
        isLogged,
        setIsLogged,
        loadingUserInfo,
        setLoadingUserInfo,
        login,
        createDid,
        createIssuerDid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
