import { Stack, Typography } from '@mui/material';

function ApplySuccessfull() {
  return (
    <Stack gap={2}>
      <Typography variant='h4'>Congragultions !</Typography>
      <Typography variant='h5'>You successfully applied to this job</Typography>
      <Typography variant='body1'>
        Your application has been submitted. You will be contacted by the
        employer if you are shortlisted.
      </Typography>
    </Stack>
  );
}

export default ApplySuccessfull;
