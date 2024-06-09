'use client';

import {
  Container,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { Suspense, useMemo } from 'react';

import JobNavBar from '@/components/JobBoard/JobNavBar';

function JobBoardLayout({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const jobboardTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#01050e',
          },
          background: {
            default: '#1d1e20',
            paper: '#35363a',
          },
        },
        components: {
          // Name of the component
          MuiPaper: {
            styleOverrides: {
              // Name of the slot
              root: {
                // Some CSS
                borderRadius: '10px',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {},
            },
          },
          MuiStack: {
            styleOverrides: {
              root: {
                minWidth: 0,
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={jobboardTheme}>
      <CssBaseline />
      <Stack p={2} gap={2}>
        <JobNavBar />
        <Container maxWidth='lg'>
          <Suspense>{children}</Suspense>
        </Container>
      </Stack>
    </ThemeProvider>
  );
}

export default JobBoardLayout;
