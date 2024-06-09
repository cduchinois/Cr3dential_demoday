import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { Stack } from '@mui/material';

import TabIcon from './TabIcon';

function Navbar() {
  return (
    <Stack
      direction='row'
      justifyContent='space-around'
      alignItems='flex-end'
      justifySelf='flex-end'
      p={2}
    >
      <TabIcon redirectTo='/' icon={<HomeIcon />} label='Home' />
      <TabIcon
        redirectTo='/credential-app/credentials'
        icon={<ChecklistIcon />}
        label='Credentials'
      />
      <TabIcon
        redirectTo='/credential-app/profile'
        icon={<PersonIcon />}
        label='Profile'
      />
      <TabIcon redirectTo='/jobboard' icon={<WorkIcon />} label='Jobs' />
    </Stack>
  );
}

export default Navbar;
