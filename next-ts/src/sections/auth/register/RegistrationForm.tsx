"use client"

import React, { useState} from 'react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Grid, Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useSnackbar } from 'src/components/snackbar';

import { paths } from '../../../routes/paths';
import {useRouter} from "../../../routes/hooks";
import Iconify from '../../../components/iconify';
import {register} from "../../../api/AuthRequest";
import { RouterLink } from '../../../routes/components';


const RegistrationForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [role, setRole] = useState<string>('');
  const [label, setLabel] = useState<string>('role');
  const router = useRouter();

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    setLabel(selectedRole === 'USER' ? 'user' : 'seller');
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };



  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await register(role, email, username, password);
      console.log('Registration successful', response);
      enqueueSnackbar('Реестрація пройшла успішно!');

      router.push(paths.auth.login);

    } catch (errorR) {
      console.error('Registration failed', errorR);
      enqueueSnackbar('Якась помилка упс!', errorR);

      setError('Registration failed');
    }
  };





  return (
    <form>
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">Registration: </Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Already have an account?</Typography>

          <Link component={RouterLink} href={paths.auth.login} variant="subtitle2">
            Увійти
          </Link>
        </Stack>
      </Stack>

      {!!error && (
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      )}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="role-label">{label}</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              data-testid="role"
              variant="outlined"
              value={role}
              label={label}
              onChange={handleRoleChange}
              fullWidth
            >
              <MenuItem value="USER" id="user-role">user</MenuItem>
              <MenuItem value="SELLER" id="seller-role">seller</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
          />
        </Grid>
        {emailError && (
          <Typography variant="body2" color="error" align="center">
            {emailError}
          </Typography>
        )}

        {usernameError && (
          <Typography variant="body2" color="error" align="center">
            {usernameError}
          </Typography>
        )}


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

        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>



        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegistrationForm;
