import {useState, useEffect} from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';

import { HEADER } from '../config-layout';
import ShopButton from "../common/shop-button";
import LoginButton from '../common/login-button';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';
import RegisterButton from "../common/register-button";

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  // Перевірка наявності токена в localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
          >
            <Logo />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {!isAuthenticated && (mdUp ? <RegisterButton /> : <LoginButton />)}
            {!isAuthenticated && (!mdUp ? <RegisterButton /> : <LoginButton />)}
            <ShopButton />
          </Stack>
          <SettingsButton
            sx={{
              ml: { xs: 1, md: 0 },
              mr: { md: 2 },
            }}
          />
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
