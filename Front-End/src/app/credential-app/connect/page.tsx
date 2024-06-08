import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

function ConnectWithCredentials() {
  return (
    <Stack
      gap={4}
      justifyContent='center'
      alignItems='center'
      flexGrow='1'
      mb={4}
    >
      <Typography variant='h5' textAlign='center'>
        Connect to Ripple.com ?
      </Typography>
      <Stack direction='row' justifyContent='center' gap={2} width='100%'>
        <Link href='/jobboard'>
          <Button variant='contained' color='primary'>
            Connect
          </Button>
        </Link>
        <Button variant='outlined' color='error'>
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}

export default ConnectWithCredentials;
