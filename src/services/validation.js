export const validateUser = (user, setEmail, setPassword) => {
  const validationEmailExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  switch (true) {
    case email === '' && password === '':
      setEmailError('Enter email');
      setPasswordError('empty');
      return 'failed';
    case password === '' && email !== validationEmailExp:
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

    case email !== validationEmailExp:
      setEmailError(
        'Invalid email address. Valid e-mail can contain only latin letters, numbers, @ and .',
      );
      return 'failed';
    default:
      return { email, password };
  }
};
