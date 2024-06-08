import { Button, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <Stack justifyContent='center' alignItems='center' flexGrow={1} gap={2}>
      <Typography variant='h1'>404</Typography>
      <Typography variant='h2'>Not Found</Typography>
      <Link href='/'>
        <Button variant='contained'>Back Home</Button>
      </Link>
    </Stack>
  );
}
