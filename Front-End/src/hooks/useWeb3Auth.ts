import { useContext } from 'react';

import { AuthContext } from '@/components/Provider/Web3AuthProvider';

export const useWeb3Auth = () => {
  return useContext(AuthContext);
};
