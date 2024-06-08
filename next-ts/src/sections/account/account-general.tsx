import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {useState, useEffect, useCallback} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';

import {useTranslate} from "../../locales";
import {updateUser, getUserPhoto, setUserPhoto} from "../../api/UserRequest";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const username = typeof window !== 'undefined' ? localStorage.getItem('username') || '' : '';
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';

  const [userPhotoUrl, setUserPhotoUrl] = useState<string | undefined>(undefined);

  const UpdateUserSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    photoURL: Yup.mixed().nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (username) {
      getUserPhoto(username).then(photoBlob => {
        if (photoBlob) {
          const photoUrl = URL.createObjectURL(photoBlob as Blob);
          setUserPhotoUrl(photoUrl);
          setValue('photoURL', photoUrl);
        }
      });
    }
  }, [username, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateUser(token, username, data.email, data.firstName, data.lastName, data.address, data.phoneNumber);
      const { photoURL } = methods.getValues();
      if (photoURL instanceof File) {
        await setUserPhoto(token, username, photoURL);
      }

      enqueueSnackbar(t('update_success'));
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('update_failed'), { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  { t('allowed') }, *.jpeg, *.jpg, *.png, *.gif
                  <br /> { t('max_size_of') } {fData(3145728)}


                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="username"
                label={username}
                disabled
              />
              <RHFTextField name="email" label="Email Адреса" />
              <RHFTextField name="firstName" label="ім'я" />
              <RHFTextField name="lastName" label="Прізвище" />
              <RHFTextField name="phoneNumber" label="Номер телефону" />
              <RHFTextField name="address" label="Адреса" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                { t('save') }
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
