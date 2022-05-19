The <span class="badge">< Register /></span> page component in MST is rendered at the <span class="badge">/register</span> route in the application and facilitates the creation of new users. All users created via this page are created via the client-side <span class="badge">Accounts.createUser()</span> method.

The page includes support for the <span class="badge">< OAuthLoginButtons /></span> component (which renders each of the three OAuth login buttons you've provided configuration for) as well as a form for signing up with a traditional email address and password.

<blockquote>
  In order to enable support for OAuth logins, you will need to provide the proper credentials for each service that you'd like to enable.
</blockquote>

~~~js
  // meteors
  import { Accounts } from 'meteor/accounts-base';

  import * as Yup from 'yup';
  import React, { useState } from 'react';
  import { useFormik, Form, FormikProvider } from 'formik';
  // material
  import { Stack, TextField, IconButton, InputAdornment, Alert, Box } from '@mui/material';
  import { LoadingButton } from '@mui/lab';

  // component
  import Iconify from '../../../components/Iconify';

  // ----------------------------------------------------------------------

  export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const RegisterSchema = Yup.object().shape({
      firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First name required'),
      lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      validationSchema: RegisterSchema,
      onSubmit: (values, { setSubmitting }) => {
        const { firstName, lastName, email, password } = values;
        Accounts.createUser(
          {
            email,
            password,
            profile: {
              name: {
                first: firstName,
                last: lastName,
              },
            },
          },
          (error) => {
            if (!error) return;
            const { reason } = error;
            setError(true);
            setErrorText(reason);
            setSubmitting(false);
          },
        );
      },
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {isError && <Alert severity="error">{errorText}</Alert>}
          <Box m={2} />
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="First name"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                label="Last name"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>

            <TextField
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    );
  }

~~~