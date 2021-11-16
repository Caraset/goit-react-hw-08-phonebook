import { Box, Typography, TextField, Button } from '@mui/material/';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import s from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const location = useLocation();
  console.log(location.pathname);

  const onInputChange = ({ target }) => {
    target.name === 'email' ? setEmailError(null) : setPasswordError(null);
    target.name === 'email'
      ? setEmail(target.value)
      : setPassword(target.value);
  };

  const validateUser = () => {
    const validationEmailExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailChek = validationEmailExp.test(String(email).toLowerCase());
    console.log(emailChek);

    switch (true) {
      case email === '' && password === '':
        setEmailError('Enter email');
        setPasswordError('empty');
        return 'failed';
      case password === '' && !emailChek:
        setPasswordError('empty');
        setEmailError(
          'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
        );
        return 'failed';
      case email === '':
        setEmailError('empty');
        return;
      case password === '':
        setPasswordError('empty');
        return 'failed';

      case !emailChek:
        setEmailError(
          'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
        );
        return 'failed';
      default:
        return { email, password };
    }
  };

  const submit = e => {
    e.preventDefault();

    const validationResult = validateUser();

    if (validationResult === 'failed') {
      return;
    } else {
      console.log(validationResult);
      reset();
    }
  };

  const submitRegistration = e => {};

  const reset = () => {
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
      <Box component="form" noValidate className={s.form} onSubmit={submit}>
        <TextField
          margin="normal"
          required
          // fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={onInputChange}
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
          onChange={onInputChange}
          error={passwordError && true}
          helperText={passwordError}
        />
        <Button
          // onClick={submit}
          variant="contained"
          type="submit"
          sx={{ marginTop: '50px' }}
        >
          {location.pathname === '/login' ? 'Sign in' : 'Submit'}
        </Button>
      </Box>
    </>
    /* </Box> */
  );
}
