import { Stack } from '@mui/material';

import CredentialCard from '@/components/Credentials/CredentialCard';

import { defaultCredentials } from '@/__mocks__/credentials.mock';

function CredentialsPage() {
  return (
    <Stack gap={2}>
      {defaultCredentials.map((credential) => (
        <CredentialCard key={credential.id} credential={credential} />
      ))}
    </Stack>
  );
}

export default CredentialsPage;
