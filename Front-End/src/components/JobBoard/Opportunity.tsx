import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import ApplyButton from './ApplyButton';

function Opportunity({ opportunity }: { opportunity: IOpportunity }) {
  const isOngoing = new Date() < opportunity.deadlineToApply;

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 4,
        maxWidth: 'sm',
        width: 'sm',
      }}
    >
      <Stack direction='row' gap={2} alignItems='center'>
        <Image
          src={opportunity.img}
          alt={opportunity.issuer}
          width={75}
          height={75}
        />
        <Typography variant='h6' flexGrow={1}>
          {opportunity.issuer}
        </Typography>
        <Chip
          icon={
            <FiberManualRecordIcon color={isOngoing ? 'success' : 'disabled'} />
          }
          label={isOngoing ? 'Ongoing' : 'Passed'}
        />
      </Stack>
      <Typography variant='h5'>{opportunity.title}</Typography>
      <Typography
        variant='caption'
        color='text.secondary'
        whiteSpace='pre-line'
        flexGrow={1}
      >
        {opportunity.description}
      </Typography>
      <ApplyButton />
    </Paper>
  );
}

export default Opportunity;
