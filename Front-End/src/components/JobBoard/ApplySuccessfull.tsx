import { Button, Stack, Typography } from '@mui/material';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
function ApplySuccessfull({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Fireworks
        autorun={{
          speed: 1,
          duration: 0,
          delay: 5,
        }}
        decorateOptions={(options) => {
          options.particleCount = 100;
          return options;
        }}
      />
      <Stack gap={2} flexGrow={1}>
        <Typography variant='h4'>Congragultions !</Typography>
        <Typography variant='h5'>
          You successfully applied to this job
        </Typography>
        <Stack flexGrow={1} gap={2} justifyContent='center'>
          <Typography variant='body1'>
            Your application has been submitted. You will be contacted by the
            employer if you are shortlisted.
          </Typography>
        </Stack>
        <Button
          variant='contained'
          color='primary'
          onClick={onClose}
          sx={{
            alignSelf: 'center',
          }}
        >
          Continue
        </Button>
      </Stack>
    </>
  );
}

export default ApplySuccessfull;
