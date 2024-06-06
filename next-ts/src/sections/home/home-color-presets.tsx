import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { presetOptions } from 'src/theme/options/presets';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------
export default function HomeColorPresets() {
  const settings = useSettingsContext();

  const renderDescription = (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Темізація з MUI
       </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="body1"> MUI (Material-UI) надає потужну систему темізації, яка дозволяє налаштовувати зовнішній вигляд компонентів додатку. Це робиться за допомогою створення теми, яку можна налаштувати відповідно до потреб вашого проекту.  </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Ось приклад, як можна створити і використовувати тему в MUI:
        </Typography>
      </m.div>
    </Stack>
  );
  const InfiTExt = (
    <Stack   alignItems="center"
           justifyContent="center"
       >


      <Typography variant="h2" sx={{color: 'text.primary', mb: 2}}>

        Коротко про NEXT.js
      </Typography>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2" sx={{color: 'text.primary', mb: 2}}>
          Next.js
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Next.js — це популярний фреймворк для React, який надає потужні інструменти для створення сучасних
          веб-додатків.
        </Typography>

        <Typography variant="h3" sx={{color: 'text.primary', mt: 4, mb: 2}}>
          Серверний рендеринг (SSR):
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Next.js дозволяє легко реалізувати серверний рендеринг, що покращує SEO та швидкість завантаження сторінок. Це
          особливо важливо для додатків, де швидкий доступ до контенту та пошукова оптимізація є ключовими факторами
          успіху.
        </Typography>

        <Typography variant="h3" sx={{color: 'text.primary', mt: 4, mb: 2}}>
          Системи маршрутизації:
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Next.js використовує файл-системну маршрутизацію, що значно спрощує процес налаштування маршрутів у додатку.
          Це дозволяє розробникам швидко створювати нові сторінки, просто додаючи файли у відповідні директорії.
        </Typography>

        <Typography variant="h3" sx={{color: 'text.primary', mt: 4, mb: 2}}>
          Інтеграція API:
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Next.js надає вбудовану підтримку для створення API маршрутів, що робить його ідеальним вибором для побудови
          full-stack додатків з мінімальними зусиллями.
        </Typography>

        <Typography variant="h3" sx={{color: 'text.primary', mt: 4, mb: 2}}>
          Оптимізація продуктивності:
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Вбудовані оптимізації, такі як автоматичне розділення коду, попереднє завантаження сторінок і статична
          генерація (SSG), забезпечують високу продуктивність і покращують користувацький досвід.
        </Typography>

        <Typography variant="h2" sx={{color: 'text.primary', mt: 6, mb: 2}}>
          TypeScript
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          TypeScript — це мова програмування, що є надбудовою над JavaScript і додає статичну типізацію.
        </Typography>

        {/* Аналогічно інші аспекти TypeScript */}

        <Typography variant="h2" sx={{color: 'text.primary', mt: 6, mb: 2}}>
          Material-UI (MUI)
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Material-UI (MUI) — це бібліотека компонентів для React, яка реалізує дизайн-систему Material Design від
          Google.
        </Typography>
      </m.div>

</Stack>
)
  ;


  const renderOptions = (
    <m.div variants={varFade().inDown}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          my: 5,
          width: 100,
          height: 88,
          mx: 'auto',
          position: 'relative',
        }}
      >
        {presetOptions.map((color, index) => {
          const {name, value} = color;

          const selected = settings.themeColorPresets === name;

          return (
            <CardActionArea
              key={name}
              onClick={() => settings.onUpdate('themeColorPresets', name)}
              sx={{
                width: 24,
                height: 24,
                bgcolor: value,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                position: 'absolute',
                color: 'common.white',
                ...(index === 0 && {bottom: 0}),
                ...(index === 1 && {left: 19}),
                ...(index === 2 && {right: 19}),
                ...(index === 3 && {top: 0, left: 0}),
                ...(index === 4 && {top: 0}),
                ...(index === 5 && {top: 0, right: 0}),
              }}
            >
              {selected && <Iconify icon="eva:color-picker-fill" width={16}/>}
            </CardActionArea>
          );
        })}
      </Stack>
    </m.div>
  );


  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: {xs: 10, md: 15},
      }}
    >
      {renderDescription}
      {renderOptions}
      {InfiTExt}
    </Container>
  );
}
