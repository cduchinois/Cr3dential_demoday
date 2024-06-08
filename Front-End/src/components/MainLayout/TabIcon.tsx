import { IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';

function TabIcon({
  redirectTo,
  icon,
  label,
}: {
  redirectTo: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={redirectTo}>
      <IconButton>
        <Stack direction='column' alignItems='center'>
          {icon}
          <Typography variant='caption'>{label}</Typography>
        </Stack>
      </IconButton>
    </Link>
  );
}

export default TabIcon;
