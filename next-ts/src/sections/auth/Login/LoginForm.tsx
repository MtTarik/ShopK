"use client"

import React, {useState, useEffect} from 'react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Grid, Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/components/snackbar';

import Logo from '../../../components/logo';
import { paths } from '../../../routes/paths';
import { login } from '../../../api/AuthRequest';
import Iconify from '../../../components/iconify';
import { RouterLink } from '../../../routes/components';



const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const accessToken = localStorage.getItem('token');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('username', username);
        enqueueSnackbar('Вхід успішний!');

        router.push(paths.home.go);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed');
    }
  };



  useEffect(() => {
    if (accessToken) {
      enqueueSnackbar('Вхід успішний!');
      router.push(paths.home.go);
    }
  }, [router, accessToken, enqueueSnackbar]);



  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Вітаємо вас: <Logo /></Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Якщо ви, новий користувач?</Typography>

        <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
          Створити аккаунт
        </Link>
      </Stack>
    </Stack>
  );

  return (
    <form>
      <Grid container spacing={2} justifyContent="center">
        {renderHead}
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
          />
        </Grid>
        <Grid item xs={12}>

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <p style={{ color: 'red' }}>{error}</p>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Grid>

      </Grid>
    </form>

);
};

export default LoginForm;
