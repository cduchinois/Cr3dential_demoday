'use client';

import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ApplyButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/credential-app/connect');
    }, 500);
  };

  return (
    <LoadingButton
      variant='contained'
      color='primary'
      onClick={onClick}
      loading={loading}
      sx={{ alignSelf: 'center' }}
    >
      Connect to apply
    </LoadingButton>
  );
}

export default ApplyButton;
