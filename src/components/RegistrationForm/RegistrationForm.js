import { Box, Typography, TextField, Button } from '@mui/material/';
import { useState } from 'react';

import s from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const onInputChange = ({ target }) => {
    target.name === 'email' ? setEmailError(null) : setPasswordError(null);
    target.name === 'email'
      ? setEmail(target.value)
      : setPassword(target.value);
  };

  const validationEmailExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submit = e => {
    e.preventDefault();

    switch (true) {
      case email === '' && password === '':
        setEmailError('Enter email');
        setPasswordError('empty');
        break;
      case password === '' && email !== validationEmailExp:
        setPasswordError('empty');
        setEmailError(
          'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
        );
        break;
      case email === '':
        setEmailError('empty');
        break;
      case password === '':
        setPasswordError('empty');
        break;

      case email !== validationEmailExp:
        setEmailError(
          'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
        );
        break;
      default:
        console.log({ email, password });
        reset();
    }
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    //
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate className={s.form}>
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
          onClick={submit}
          variant="contained"
          type="submit"
          sx={{ marginTop: '50px' }}
        >
          Sign in
        </Button>
      </Box>
    </>
    /* </Box> */
  );
}
