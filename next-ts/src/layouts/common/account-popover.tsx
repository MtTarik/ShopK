'use client';

import { m } from 'framer-motion';
import {useState, useEffect} from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import {useTranslate} from "../../locales";
import {IUserProfile} from "../../types/user";
import {getUserInfo, getUserPhoto} from "../../api/UserRequest";
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { t } = useTranslate();

  const { logout } = useAuthContext();

  const [userInfo, setUserInfo] = useState<IUserProfile | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | undefined>(undefined);
  const username = typeof window !== 'undefined' ?  localStorage.getItem('username') || '' : '';
  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('username');
      localStorage.removeItem('accessToken');
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  useEffect(() => {
    if (username) {
      getUserInfo(username).then(setUserInfo);
      getUserPhoto(username).then(photoBlob => {
        if (photoBlob) {
          setUserPhotoUrl(URL.createObjectURL(photoBlob as Blob));
        }
      });
    }
  }, [username]);


  if (!userInfo) return null;

  const OPTIONS = [
    {
      label: t('home'),
      linkTo: '/shop',

    },
    {
      label: t('profile'),
      linkTo: paths.home.user.profile,
    },
    {
      label:  t('settings'),
      linkTo: paths.home.user.account,
    },
  ];

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={userPhotoUrl}
          alt={username}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {username?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          {t('logout')}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
