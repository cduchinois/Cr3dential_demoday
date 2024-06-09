import { Stack } from '@mui/material';
import Image from 'next/image';

import credentialLogo from '@/assets/logo_cr3dential.png';

function TopBar() {
  return (
    <Stack p={2} px={4} justifyContent='center' direction='row'>
      <Image
        src={credentialLogo}
        alt='Credential Logo'
        width={200}
        height={50}
      />
    </Stack>
  );
}

export default TopBar;
