import { LoadingButton } from '@mui/lab';
import { Container, Dialog, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ApplySuccessfull from './ApplySuccessfull';
import VerifyableCredentialCard from './VerifyableCredentialCard';

function VerifyingModal({
  open,
  onClose,
  credentials,
}: {
  open: boolean;
  onClose: () => void;
  credentials: string[];
}) {
  const [loadingVerifications, setLoadingVerifications] = useState(true);
  const [loadingApply, setloadingApply] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingVerifications(false);
    }, credentials.length * 500);
  }, [credentials]);

  const onApply = () => {
    setloadingApply(true);
    setTimeout(() => {
      setloadingApply(false);
      setHasApplied(true);
      // onClose();
    }, 500);
  };

  const applyButtonLoading = loadingVerifications || loadingApply;

  return (
    <Dialog open={open} onClose={onClose}>
      <Container
        maxWidth='lg'
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '500px',
        }}
      >
        {hasApplied && <ApplySuccessfull />}
        {!hasApplied && (
          <>
            <Typography variant='h4'>Cr3dential is verifying ...</Typography>
            <Stack gap={1}>
              {credentials.map((credential, index) => (
                <VerifyableCredentialCard
                  key={index}
                  credential={credential}
                  timeout={500}
                  timeoutDelay={index * 500}
                />
              ))}
            </Stack>
            <LoadingButton
              loading={applyButtonLoading}
              variant='contained'
              color='primary'
              loadingPosition='end'
              onClick={onApply}
            >
              Apply
            </LoadingButton>
          </>
        )}
      </Container>
    </Dialog>
  );
}

export default VerifyingModal;
