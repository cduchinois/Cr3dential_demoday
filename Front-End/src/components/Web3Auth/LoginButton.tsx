import { LoadingButton } from '@mui/lab';

import { useWeb3Auth } from '@/hooks/useWeb3Auth';
import { shrinkString } from '@/lib/utils';

function LoginButton() {
  const web3Context = useWeb3Auth();

  if (!web3Context.web3Auth) {
    return (
      <LoadingButton
        loading={!web3Context.isInitialized}
        onClick={web3Context.login}
        variant='contained'
        color='primary'
      >
        Login
      </LoadingButton>
    );
  }

  return (
    <LoadingButton
      loading={web3Context.loadingUserInfo || !web3Context.userWallet}
      variant='contained'
      color='primary'
    >
      {shrinkString(web3Context.userWallet?.address || '', 5, 5) ||
        'loading...'}
    </LoadingButton>
  );
}

export default LoginButton;
