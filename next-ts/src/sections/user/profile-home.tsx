'use client';


import {useTranslation} from "react-i18next";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import {IUserProfile} from "../../types/user";


// ----------------------------------------------------------------------

type Props = {
  info: IUserProfile;
};

export default function ProfileHome({ info }: Props) {
  const { t } = useTranslation();

  const renderNumber = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(info.phoneNumber)}

          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {info.email}
            </Link>
          </Box>
        </Stack>

      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title={t('overview')} />
      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:user" width={24} />
          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {info.firstName} {info.lastName}
            </Link>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {info.address}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          <Link variant="subtitle2" color="inherit">
          {info.email}
          </Link>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {info.roles.length > 0 ? info.roles[0].name : 'No role'}
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Iconify icon="bi:phone-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {info.phoneNumber}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );


  const renderSocials = (
    <Card>
      <CardHeader title={t('contacts')} />

      <Stack spacing={2} sx={{ p: 3 }}>
        {renderNumber}

      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderSocials}
        </Stack>
      </Grid>
      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {renderAbout}
        </Stack>
      </Grid>
    </Grid>
  );
}
