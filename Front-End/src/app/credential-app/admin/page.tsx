'use client';

import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { uploadToIPFS } from '@/backend/DID-back';

function AdminPage() {
  const [ipfsHash, setIpfsHash] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [credentialName, setCredentialName] = useState('');
  const [credentialIssuer, setCredentialIssuer] = useState('');

  const upload = async () => {
    const hash = await uploadToIPFS(
      JSON.stringify({
        '@context': 'https://www.w3.org/ns/did/v1',
        id: 'did:xrpl:1:rf1',
        controller: 'did:xrpl:1:rf1',
        verificationMethod: [
          {
            id: 'did:xrpl:1:rf1#keys-1',
            type: 'EcdsaSecp256k1RecoveryMethod2020',
            controller: 'did:xrpl:1:rf1',
            publicKeyHex: '0x1234567890',
          },
        ],
      })
    );

    setIpfsHash(hash);
  };

  return (
    <Stack gap={2}>
      <Button variant='contained' color='primary' onClick={upload}>
        upload IPFS
      </Button>
      <Typography>IPFSHash : {ipfsHash}</Typography>
      <TextField
        label='Student Address'
        onChange={(e) => setStudentAddress(e.target.value)}
        variant='outlined'
      />
      <Button variant='contained' color='primary' onClick={async () => {}}>
        Create DID account for Student
      </Button>

      <TextField
        label='Credential Name'
        onChange={(e) => setCredentialName(e.target.value)}
        variant='outlined'
      />

      <TextField
        label='Credential Issuer'
        onChange={(e) => setCredentialIssuer(e.target.value)}
        variant='outlined'
      />

      <Button variant='contained' color='primary' onClick={async () => {}}>
        Create DID document for Student
      </Button>
    </Stack>
  );
}

export default AdminPage;
