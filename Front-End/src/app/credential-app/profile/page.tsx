'use client';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import CancelIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { useWeb3Auth } from '@/hooks/useWeb3Auth';
import LoginButton from '@/components/Web3Auth/LoginButton';
import jadeMeer from '@/assets/yuewang.jpg';

interface UserProfile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  dateOfBirth: string;
  birthPlace: string;
  email: string;
  phone: string;
  linkedin: string;
  twitter: string;
  github: string;
  bio: string;
}

function ProfileField({
  label,
  value,
  isEditing,
  onChange,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (isEditing) {
    return (
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white', // Text color while typing
          },
          '& .MuiInputLabel-root': {
            color: 'grey.400', // Label color
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'transparent', // Transparent background
            '& fieldset': {
              borderColor: 'grey.700', // Default border color
            },
            '&:hover fieldset': {
              borderColor: 'grey.500', // Hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main', // Focused border color
            },
          },
          // Remove default white background from autofill
          '& .MuiInputBase-input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px transparent inset',
            '-webkit-text-fill-color': '#fff',
          },
        }}
      />
    );
  }
  return (
    <Box>
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>
      <Typography color='white'>{value || '-'}</Typography>
    </Box>
  );
}

function ProfilePage() {
  const webAuth = useWeb3Auth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Jade',
    lastName: 'Meer',
    jobTitle: 'Blockchain Developer',
    company: 'Web3 Solutions',
    dateOfBirth: '1990-01-01',
    birthPlace: 'Paris, France',
    email: 'jade.meer@example.com',
    phone: '+33 6 12 34 56 78',
    linkedin: 'linkedin.com/in/jade-meer',
    twitter: 'twitter.com/jademeer',
    github: 'github.com/jademeer',
    bio: 'Passionate blockchain developer with expertise in Web3 technologies and digital identity solutions.',
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // TODO: Implement save logic to backend
    setIsEditing(false);
  };

  const handleChange =
    (field: keyof UserProfile) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfile((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleCancel = () => {
    // TODO: Reset form to original values
    setIsEditing(false);
  };

  if (!webAuth.isLogged) {
    return (
      <Stack
        flexGrow={1}
        spacing={2}
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='h5'>You are not logged in</Typography>
        <LoginButton />
      </Stack>
    );
  }

  return (
    <Stack flexGrow={1} spacing={3} sx={{ mb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4'>Profile</Typography>
        <IconButton
          onClick={isEditing ? handleCancel : handleEdit}
          color={isEditing ? 'error' : 'primary'}
        >
          {isEditing ? <CancelIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Profile Header */}
          <Stack alignItems='center' spacing={2}>
            <Avatar sx={{ width: 150, height: 150 }}>
              <Image src={jadeMeer} alt='Profile Picture' />
            </Avatar>
            {isEditing && (
              <Button variant='outlined' component='label'>
                Change Picture
                <input hidden accept='image/*' type='file' />
              </Button>
            )}
          </Stack>

          {/* Basic Information */}
          <Stack spacing={3}>
            {/* Names in row */}
            <Stack direction='row' spacing={4}>
              <ProfileField
                label='First Name'
                value={profile.firstName}
                isEditing={isEditing}
                onChange={handleChange('firstName')}
              />
              <ProfileField
                label='Last Name'
                value={profile.lastName}
                isEditing={isEditing}
                onChange={handleChange('lastName')}
              />
            </Stack>

            {/* Full width fields */}
            <ProfileField
              label='Job Title'
              value={profile.jobTitle}
              isEditing={isEditing}
              onChange={handleChange('jobTitle')}
            />
            <ProfileField
              label='Company'
              value={profile.company}
              isEditing={isEditing}
              onChange={handleChange('company')}
            />
          </Stack>

          <Divider />

          {/* Personal Information */}
          <Stack spacing={3}>
            <Typography variant='h6'>Personal Information</Typography>
            <ProfileField
              label='Date of Birth'
              value={profile.dateOfBirth}
              isEditing={isEditing}
              onChange={handleChange('dateOfBirth')}
            />
            <ProfileField
              label='Birth Place'
              value={profile.birthPlace}
              isEditing={isEditing}
              onChange={handleChange('birthPlace')}
            />
            <ProfileField
              label='Email'
              value={profile.email}
              isEditing={isEditing}
              onChange={handleChange('email')}
            />
            <ProfileField
              label='Phone'
              value={profile.phone}
              isEditing={isEditing}
              onChange={handleChange('phone')}
            />
          </Stack>

          <Divider />

          {/* Social Links */}
          <Stack spacing={3}>
            <Typography variant='h6'>Social Links</Typography>
            <Stack spacing={3}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <LinkedInIcon color='action' />
                <Box flexGrow={1}>
                  <ProfileField
                    label='LinkedIn'
                    value={profile.linkedin}
                    isEditing={isEditing}
                    onChange={handleChange('linkedin')}
                  />
                </Box>
              </Stack>
              <Stack direction='row' spacing={2} alignItems='center'>
                <TwitterIcon color='action' />
                <Box flexGrow={1}>
                  <ProfileField
                    label='Twitter'
                    value={profile.twitter}
                    isEditing={isEditing}
                    onChange={handleChange('twitter')}
                  />
                </Box>
              </Stack>
              <Stack direction='row' spacing={2} alignItems='center'>
                <GitHubIcon color='action' />
                <Box flexGrow={1}>
                  <ProfileField
                    label='GitHub'
                    value={profile.github}
                    isEditing={isEditing}
                    onChange={handleChange('github')}
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          {/* Bio */}
          <Stack spacing={2}>
            <Typography variant='h6'>Bio</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Bio'
                value={profile.bio}
                onChange={handleChange('bio')}
              />
            ) : (
              <Typography>{profile.bio}</Typography>
            )}
          </Stack>

          <Divider />

          {/* DID Information */}
          <Stack spacing={2}>
            <Typography variant='h6'>Decentralized Identity</Typography>
            <Chip
              label={`did:xrp:1:${webAuth.userWallet?.address}`}
              sx={{ alignSelf: 'flex-start' }}
            />
          </Stack>

          {/* Save Button */}
          {isEditing && (
            <>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default ProfilePage;
