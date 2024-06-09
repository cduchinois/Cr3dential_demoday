import { LoadingButton } from '@mui/lab';
import { Container, Dialog, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ApplySuccessfull from './ApplySuccessfull';
import VerifyableCredentialCard from './VerifyableCredentialCard';

const animationTimeout = 600;

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
    }, credentials.length * animationTimeout + animationTimeout);
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
          justifyContent: 'space-around',
          gap: 2,
          width: '500px',
          height: '580px',
        }}
      >
        {hasApplied && <ApplySuccessfull onClose={onClose} />}
        {!hasApplied && (
          <>
            <Typography variant='h4'>Cr3dential is verifying ...</Typography>
            <Stack gap={2}>
              {credentials.map((credential, index) => (
                <VerifyableCredentialCard
                  key={index}
                  credential={credential}
                  timeout={animationTimeout}
                  timeoutDelay={index * animationTimeout}
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
