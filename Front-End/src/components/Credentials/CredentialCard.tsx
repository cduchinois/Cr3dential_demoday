import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import {
  Card,
  CardActions,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
function CredentialCard({ credential }: { credential: ICredential }) {
  return (
    <Card
      sx={{
        display: 'flex',
        p: 2,
        gap: 2,
      }}
    >
      <Image
        src={credential.img}
        alt={credential.name}
        width={100}
        height={100}
      />
      <Stack
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography>{credential.name}</Typography>
        <Typography color='text.secondary'>{credential.issuer}</Typography>
        <CardActions
          sx={{
            display: 'flex',
            gap: 0,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
}

export default CredentialCard;
