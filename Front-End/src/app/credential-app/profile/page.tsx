'use client';

import { Avatar, Chip, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { useWeb3Auth } from '@/hooks/useWeb3Auth';

import LoginButton from '@/components/Web3Auth/LoginButton';

import jadeMeer from '@/assets/yuewang.jpg';

function ProfilePage() {
  const webAuth = useWeb3Auth();

  return (
    <Stack flexGrow={1}>
      <Typography variant='h4'>Profile</Typography>

      {!webAuth.isLogged && (
        <>
          <Typography variant='h5'>You are not logged in</Typography>
          <LoginButton />
        </>
      )}

      {webAuth.isLogged && (
        <Paper
          sx={{
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            my: 'auto',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            py: 6,
          }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
            }}
          >
            <Image src={jadeMeer} alt='Jade Meer' />
          </Avatar>
          <Typography variant='h5'>Jade meer</Typography>
          <Chip label={`did:xrp:1:${webAuth.userWallet?.address}`} />
        </Paper>
      )}
    </Stack>
  );
}

export default ProfilePage;
