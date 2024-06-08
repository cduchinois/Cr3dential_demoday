'use client';

import { Divider, Paper, Stack } from '@mui/material';

import Navbar from './NavBar';
import TopBar from './TopBar';
function MainContainer({
  children,
  isMobile,
}: {
  children: React.ReactNode;
  isMobile?: boolean;
}) {
  return (
    <Paper
      elevation={8}
      sx={{
        p: 0,
        height: isMobile ? '100%' : '680px',
        width: isMobile ? '100%' : '400px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: isMobile ? '0px' : '50px',
        backgroundColor: 'background.default',
      }}
    >
      <TopBar />
      <Divider />
      <Stack flexGrow={1} p={4} pb={0}>
        {children}
      </Stack>
      <Divider />
      <Navbar />
    </Paper>
  );
}

export default MainContainer;
