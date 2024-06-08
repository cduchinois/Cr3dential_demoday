import { Stack, Typography } from '@mui/material';

import Opportunity from '@/components/JobBoard/Opportunity';

import { defaultOpportunities } from '@/__mocks__/opportunity.mock';

function Jobboard() {
  return (
    <Stack gap={2} direction='column'>
      <Typography variant='h4'>Explore Opportunities</Typography>
      <Stack
        gap={2}
        direction='row'
        flexWrap='wrap'
        justifyContent='flex-start'
      >
        {defaultOpportunities.map((opportunity) => (
          <Opportunity key={opportunity.id} opportunity={opportunity} />
        ))}
      </Stack>
    </Stack>
  );
}

export default Jobboard;
