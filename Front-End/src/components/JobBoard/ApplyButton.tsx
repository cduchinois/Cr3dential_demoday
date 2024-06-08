import { Button } from '@mui/material';
import Link from 'next/link';

function ApplyButton() {
  return (
    <Link
      style={{
        alignSelf: 'center',
      }}
      href='/credential-app/connect'
    >
      <Button variant='contained' color='primary'>
        Connect to apply
      </Button>
    </Link>
  );
}

export default ApplyButton;
