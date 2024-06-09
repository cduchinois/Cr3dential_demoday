'use client';

import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

function ConnectWithCredentials() {
  const router = useRouter();
  const [loadingConnection, setLoadingConnection] = useState(false);
  const [loadindDisconnection, setLoadindDisconnection] = useState(false);
  const params = useSearchParams();

  const connectToWebsite = () => {
    setLoadingConnection(true);
    setTimeout(() => {
      const newUrlSearchParams = new URLSearchParams();
      newUrlSearchParams.append('verified_credentials', 'XRPL Dev Training');
      newUrlSearchParams.append(
        'verified_credentials',
        'EasyA XRPL EVM Sidechain Training'
      );
      newUrlSearchParams.append('verified_credentials', 'EasyA XRPL 101');

      router.push(`/jobboard?${newUrlSearchParams.toString()}`);
    }, 500);
  };

  const cancelConnection = () => {
    setLoadindDisconnection(true);
    setTimeout(() => {
      router.push('/jobboard');
    }, 500);
  };

  return (
    <Stack
      gap={4}
      justifyContent='center'
      alignItems='center'
      flexGrow='1'
      mb={4}
    >
      <Typography variant='h5'>Connect to Ripple.com ?</Typography>
      <Stack>
        <Typography variant='body1' color='text.secondary'>
          - XRPL Dev Training
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          - EasyA XRPL EVM Sidechain Training
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          - EasyA XRPL 101
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='center' gap={2} width='100%'>
        <LoadingButton
          loading={loadingConnection}
          variant='contained'
          color='primary'
          onClick={connectToWebsite}
        >
          Connect
        </LoadingButton>
        <LoadingButton
          loading={loadindDisconnection}
          variant='outlined'
          color='error'
          onClick={cancelConnection}
        >
          Cancel
        </LoadingButton>
      </Stack>
    </Stack>
  );
}

export default ConnectWithCredentials;
