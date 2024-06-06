import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  const settings = useSettingsContext();

  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          Легке перемикання між стилями.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ color: 'common.white' }}>
          Темна тема
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'grey.500' }}>
          Темна тема, яка приємна для очей.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Switch
          checked={settings.themeMode === 'dark'}
          onClick={() =>
            settings.onUpdate('themeMode', settings.themeMode === 'light' ? 'dark' : 'light')
          }
        />
      </m.div>
    </Stack>
  );


  return (
    <Box
      sx={{
        textAlign: 'center',
        bgcolor: 'grey.900',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}
      </Container>
    </Box>
  );
}
