'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import CompactLayout from 'src/layouts/compact';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Вибачте, сторінку не знайдено!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            На жаль, нам не вдалося знайти сторінку, яку ви шукаєте. Можливо, ви неправильно ввели URL? Будь ласка
            перевірте URL.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/shop" size="large" variant="contained">
          Повернутися на головну
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
