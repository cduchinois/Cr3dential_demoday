'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface CredentialOfferDetails {
  type: string;
  issuer: string;
  holder: string;
  email: string;
  issuanceDate: string;
  expirationDate: string;
  status: string;
  fields: Record<string, string>;
}

function CredentialOfferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [offerDetails, setOfferDetails] =
    useState<CredentialOfferDetails | null>(null);

  useEffect(() => {
    const fetchCredentialOffer = async () => {
      try {
        const credentialType = searchParams.get('type');
        if (!credentialType) {
          throw new Error('No credential offer type provided');
        }

        // Decode the QR data which should be a JSON string
        // Request the credential offer from the API
        const response = await fetch('/api/request-credential', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            did: "did:example:user",
            email: "user@example.com",
            type: credentialType,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || 'Failed to fetch credential offer'
          );
        }

        const { credentialOffer } = await response.json();
        setOfferDetails(credentialOffer);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch credential offer'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentialOffer();
  }, [searchParams]);

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      // TODO: Call API to accept the credential offer
      const response = await fetch('/api/accept-credential', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offerId: searchParams.get('id'),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to accept credential');
      }

      router.push('/credential-app/credentials');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to accept credential'
      );
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    router.push('/credential-app/credentials');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color='error' variant='h6'>
          {error}
        </Typography>
        <Button
          sx={{ mt: 2 }}
          onClick={() => router.push('/credential-app/credentials')}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  if (!offerDetails) {
    return null;
  }

  return (
    <Stack spacing={3} sx={{ pb: 10 }}>
      <Typography variant='h4'>Credential Offer</Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Issuer Information */}
          <Stack spacing={1}>
            <Typography variant='h6'>Issuer</Typography>
            <Typography>{offerDetails.issuer}</Typography>
          </Stack>

          <Divider />

          {/* Credential Type */}
          <Stack spacing={1}>
            <Typography variant='h6'>Credential Type</Typography>
            <Typography>{offerDetails.type}</Typography>
          </Stack>

          <Divider />

          {/* Dates */}
          <Stack spacing={2}>
            <Typography variant='h6'>Validity</Typography>
            <Stack spacing={0.5}>
              <Typography variant='caption' color='text.secondary'>
                Issuance Date
              </Typography>
              <Typography>
                {new Date(offerDetails.issuanceDate).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant='caption' color='text.secondary'>
                Expiration Date
              </Typography>
              <Typography>
                {new Date(offerDetails.expirationDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* Credential Details */}
          <Stack spacing={2}>
            <Typography variant='h6'>Credential Details</Typography>
            {Object.entries(offerDetails.fields).map(([key, value]) => (
              <Stack key={key} spacing={0.5}>
                <Typography variant='caption' color='text.secondary'>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
                <Typography>{value}</Typography>
              </Stack>
            ))}
          </Stack>

          <Divider />

          {/* Action Buttons */}
          <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <Button
              variant='outlined'
              color='error'
              startIcon={<CancelIcon />}
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              variant='contained'
              color='primary'
              startIcon={<CheckCircleIcon />}
              onClick={handleAccept}
            >
              Accept
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CredentialOfferPage;
