'use client';

import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  router.push('/jobboard');

  return (
    <Stack flexGrow={1} alignItems='center'>
      {/* <h1>OUI</h1>
      <LoginButton /> */}
    </Stack>
  );
}
