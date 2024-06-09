'use client';

import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { useWeb3Auth } from '@/hooks/useWeb3Auth';

import { uploadToIPFS } from '@/backend/DID-back';

function AdminPage() {
  const [ipfsHash, setIpfsHash] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [credentialName, setCredentialName] = useState('');
  const [credentialIssuer, setCredentialIssuer] = useState('');

  const webAuth = useWeb3Auth();

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
      <Stack direction='row' gap={2}>
        <Typography>Student Address</Typography>
        <input
          type='text'
          onChange={(event) => setStudentAddress(event.target.value)}
        />
      </Stack>
      <Button
        variant='contained'
        color='primary'
        onClick={async () => {
          webAuth.createDid(studentAddress, '0x1234567890');
        }}
      >
        Create DID account for Student
      </Button>

      <Stack direction='row' gap={2}>
        <Typography>Credential Name</Typography>
        <input
          type='text'
          onChange={(event) => setCredentialName(event.target.value)}
        />
      </Stack>

      <Stack direction='row' gap={2}>
        <Typography>Credential Issuer</Typography>
        <input
          type='text'
          onChange={(event) => setCredentialIssuer(event.target.value)}
        />
      </Stack>

      <Button
        variant='contained'
        color='primary'
        onClick={async () => {
          webAuth.createIssuerDid(credentialIssuer, '0x1234567890');
        }}
      >
        Create DID document for Student
      </Button>
    </Stack>
  );
}

export default AdminPage;
