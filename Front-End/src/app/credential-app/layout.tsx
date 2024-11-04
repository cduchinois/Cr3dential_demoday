'use client';
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { Suspense, useMemo } from 'react';

import MainContainer from '@/components/MainLayout/MainContainer';

function CredentialAppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery('(max-width:600px)');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#01050e',
          },
          background: {
            default: 'rgb(2 18 54)',
            paper: '#212f4e',
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#00c1d2',
          backgroundImage: 'linear-gradient(57deg, #00919e 2%, #7e0180 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        <MainContainer isMobile={isMobile}>
          <Suspense>{children}</Suspense>
        </MainContainer>
      </Box>
    </ThemeProvider>
  );
}

export default CredentialAppLayout;
