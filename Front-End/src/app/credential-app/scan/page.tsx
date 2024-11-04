'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Paper, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';

const ScannerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '250px',
  height: '250px',
  border: '2px solid white',
  borderRadius: '20px',
  boxShadow: '0 0 0 100vmax rgba(0, 0, 0, 0.6)',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '230px',
    height: '230px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '15px',
  }
}));

function QRScannerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        // Handle successful scan
        console.log('QR code detected:', result.data);
        // TODO: Process the QR code data
        // router.push(`/credential-app/credentials?data=${encodeURIComponent(result.data)}`);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    setQrScanner(scanner);
    scanner.start().catch((err) => {
      setError('Failed to start camera: ' + err.message);
    });

    return () => {
      scanner.destroy();
    };
  }, [router]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        zIndex: 1100,
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h6" color="white">
          Scan QR Code
        </Typography>
        <IconButton
          onClick={() => router.back()}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Paper>

      {/* Camera View */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <ScannerOverlay />

        {/* Instructions */}
        <Typography
          variant="body1"
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textAlign: 'center',
            width: '80%',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Position the QR code within the frame
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography
            color="error"
            sx={{
              position: 'absolute',
              bottom: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              width: '80%',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: 2,
              borderRadius: 1,
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default QRScannerPage;