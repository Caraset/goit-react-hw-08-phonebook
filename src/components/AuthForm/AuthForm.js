import { Box, Typography, TextField, Button } from '@mui/material/';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import s from './AuthForm.module.css';

import { useRegisterUserMutation, useLoginUserMutation } from 'redux/phonebook';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux/authSlice';

export default function AuthForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const dispatch = useDispatch();

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const location = useLocation();

  const validateUser = () => {
    const validationEmailExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailChek = validationEmailExp.test(String(email).toLowerCase());

    let passedValidation = true;

    if (!emailChek) {
      setEmailError(
        'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
      );
      passedValidation = false;
    } else if (email === '') {
      setEmailError('Enter email');
      passedValidation = false;
    }

    if (password === '') {
      setPasswordError('empty');
      passedValidation = false;
    }

    if (location.pathname === '/login') {
      return passedValidation;
    }

    if (name === '') {
      setNameError('empty');
      passedValidation = false;
    }

    return passedValidation;

    // switch (true) {
    //   case email === '' && password === '':
    //     setEmailError('Enter email');
    //     setPasswordError('empty');
    //     return 'failed';
    //   case password === '' && !emailChek:
    //     setPasswordError('empty');
    //     setEmailError(
    //       'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
    //     );
    //     return 'failed';
    //   case email === '':
    //     setEmailError('empty');
    //     return;
    //   case password === '':
    //     setPasswordError('empty');
    //     return 'failed';

    //   case !emailChek:
    //     setEmailError(
    //       'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
    //     );
    //     return 'failed';
    //   default:
    //     return true;
    // }
  };

  const submit = e => {
    e.preventDefault();

    const validationResult = validateUser();

    if (validationResult === false) {
      return;
    } else {
      loginUser({ email, password }).then(({ data }) =>
        dispatch(setCredentials(data)),
      );
      reset();
    }
  };

  const submitRegistration = e => {
    e.preventDefault();

    const validationResult = validateUser();

    if (validationResult === false) {
      return;
    } else {
      registerUser({ email, password, name }).then(({ data }) =>
        dispatch(setCredentials(data)),
      );
      reset();
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setEmailError(null);
    setPasswordError(null);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        {location.pathname === '/login' ? 'Sign in' : 'Registration'}
      </Typography>
      <Box
        component="form"
        noValidate
        className={s.form}
        onSubmit={location.pathname === '/login' ? submit : submitRegistration}
      >
        {location.pathname === '/registration' && (
          <TextField
            margin="normal"
            required
            // fullWidth
            id="name"
            label="Name"
            name="name"
            type="name"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
              setNameError(null);
            }}
            error={nameError && true}
            helperText={nameError}
          />
        )}
        <TextField
          margin="normal"
          required
          // fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          // autoFocus
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
            setEmailError(null);
          }}
          error={emailError && true}
          helperText={emailError}
        />

        <TextField
          margin="normal"
          required
          // fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
            setPasswordError(null);
          }}
          error={passwordError && true}
          helperText={passwordError}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: '50px' }}>
          {location.pathname === '/login' ? 'Sign in' : 'Submit'}
        </Button>
      </Box>
    </>
  );
}
