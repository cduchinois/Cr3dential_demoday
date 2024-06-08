import { Stack } from '@mui/material';
import Image from 'next/image';

import rippleLogo from '@/assets/rippleLogo.png';

import LoginButton from '../Web3Auth/LoginButton';

function JobNavBar() {
  return (
    <Stack
      gap={2}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
    >
      <Image src={rippleLogo} alt='logo' width={200} height={100} />
      <LoginButton />
    </Stack>
  );
}

export default JobNavBar;
