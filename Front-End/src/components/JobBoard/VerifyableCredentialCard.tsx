'use client';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { CircularProgress, Fade, Grow, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function VerifyableCredentialCard({
  credential,
  timeout,
  timeoutDelay,
}: {
  credential: string;
  timeout: number;
  timeoutDelay: number;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, timeoutDelay + timeout);
  }, [timeoutDelay, timeout]);

  return (
    <Fade in timeout={timeout} style={{ transitionDelay: `${timeoutDelay}ms` }}>
      <Stack gap={1} direction='row' alignItems='center'>
        {loading && <CircularProgress size={20} />}
        {!loading && (
          <Grow in timeout={timeout}>
            <TaskAltIcon color='success' />
          </Grow>
        )}
        <Typography variant='body1'>{credential}</Typography>
      </Stack>
    </Fade>
  );
}

export default VerifyableCredentialCard;
