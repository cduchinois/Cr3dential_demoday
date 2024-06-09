'use client';

import { Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Opportunity from '@/components/JobBoard/Opportunity';
import VerifyingModal from '@/components/JobBoard/VerifyingModal';

import { defaultOpportunities } from '@/__mocks__/opportunity.mock';

function Jobboard() {
  const params = useSearchParams();
  const [openedModal, setOpenedModal] = useState(false);
  const verifiedCredentials = params.getAll('verified_credentials');

  useEffect(() => {
    setTimeout(() => {
      setOpenedModal(verifiedCredentials.length > 0);
    }, 500);
  }, []);

  return (
    <>
      <VerifyingModal
        open={openedModal}
        onClose={() => setOpenedModal(false)}
        credentials={verifiedCredentials}
      />
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
    </>
  );
}

export default Jobboard;
