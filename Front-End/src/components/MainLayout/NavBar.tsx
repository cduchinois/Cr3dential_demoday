import ChecklistIcon from '@mui/icons-material/Checklist';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PersonIcon from '@mui/icons-material/Person';
import { Stack, IconButton, styled, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

import TabIcon from './TabIcon';

const NavBarContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: '16px 16px 0 0',
  background: theme.palette.background.paper,
  boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: 1000,
}));

// Create a styled scan button with relief effect
const ScanButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  position: 'absolute',
  left: '50%',
  top: -20,
  transform: 'translateX(-50%)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.2s ease-in-out',
  '&:hover, &:active': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
    transform: 'translateX(-50%) scale(1.05)',
  },
  '&:active': {
    transform: 'translateX(-50%) scale(0.95)',
  },
}));

function Navbar() {
  const router = useRouter();

  return (
    <NavBarContainer elevation={3}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          position: 'relative',
          height: '64px',
          px: 5,
          pb: 1,
          pt: 2,
        }}
      >
        <TabIcon
          redirectTo='/credential-app/profile'
          icon={<PersonIcon sx={{ fontSize: 28 }} />}
          label='Profile'
        />
        <ScanButton onClick={() => router.push('/credential-app/scan')}>
          <QrCodeScannerIcon sx={{ color: 'white', fontSize: '28px' }} />
        </ScanButton>
        <TabIcon
          redirectTo='/credential-app/credentials'
          icon={<ChecklistIcon sx={{ fontSize: 28 }} />}
          label='Credentials'
        />
      </Stack>
    </NavBarContainer>
  );
}

export default Navbar;
