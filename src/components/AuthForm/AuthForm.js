import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRegisterUserMutation, useLoginUserMutation } from 'redux/phonebook';
import { setCredentials } from 'redux/auth/authSlice';
import { Box, Typography, TextField, Button } from '@mui/material/';

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

  useEffect(() => {
    reset();
  }, [location]);

  const validateUser = () => {
    const validationEmailExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailChek = validationEmailExp.test(String(email).toLowerCase());

    let passedValidation = true;

    if (email === '') {
      setEmailError('Enter email');
      passedValidation = false;
    } else if (!emailChek) {
      setEmailError(
        'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
      );
      passedValidation = false;
    }

    if (password === '') {
      setPasswordError('Enter password');
      passedValidation = false;
    } else if (password.length < 7) {
      setPasswordError('Password too short');
      passedValidation = false;
    }

    if (location.pathname === '/login') {
      return passedValidation;
    }

    if (name === '') {
      setNameError('Enter name');
      passedValidation = false;
    }

    return passedValidation;
  };

  const submit = e => {
    e.preventDefault();

    const validationResult = validateUser();

    if (validationResult === false) {
      return;
    } else {
      loginUser({ email, password });
      reset();
    }
  };

  const submitRegistration = e => {
    e.preventDefault();

    const validationResult = validateUser();

    if (validationResult === false) {
      return;
    } else {
      console.log({ email, password, name });
      registerUser({ email, password, name })
        .then(({ data }) => dispatch(setCredentials(data)))
        .catch(r => console.log(r));
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
        onSubmit={location.pathname === '/login' ? submit : submitRegistration}
        sx={{ display: 'flex', flexDirection: 'column', width: '400px' }}
      >
        {location.pathname === '/registration' && (
          <TextField
            margin="normal"
            required
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
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
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
