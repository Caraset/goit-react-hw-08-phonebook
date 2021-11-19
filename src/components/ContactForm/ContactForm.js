import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Popover,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

import { getContacts } from 'redux/selectors';
import { useAddContactMutation } from 'redux/phonebook';
import { useSnackbar } from 'notistack';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: contacts } = useSelector(getContacts);

  const [addContact] = useAddContactMutation();

  const { enqueueSnackbar } = useSnackbar();

  const nameValidation =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

  const numberValidation = /^\d|-+$/;

  const validateContact = () => {
    const namePassedValidation = nameValidation.test(
      String(name).toLowerCase(),
    );
    const numberPassedValidation = numberValidation.test(number);

    let passedValidation = true;

    if (name === '') {
      setNameError('Enter name');
      passedValidation = false;
    } else if (!namePassedValidation) {
      setNameError('Wrong format');
      passedValidation = false;
    }

    if (number === '') {
      setNumberError('Enter number');
      passedValidation = false;
    } else if (!numberPassedValidation) {
      setNumberError('Wrong format');
      passedValidation = false;
    }

    return passedValidation;
  };

  const handleClose = () => {
    setAnchorEl(null);
    reset();
    setNameError(null);
    setNumberError(null);
  };

  function onFormSubmit(e) {
    e.preventDefault();

    const contact = {
      name: name.toLowerCase(),
      number,
    };

    if (!validateContact()) {
      return;
    }

    if (contacts.find(el => el.name === contact.name)) {
      enqueueSnackbar(`${contact.name} is already in contacts`, {
        variant: 'error',
      });
    } else {
      handleClose();
      addContact(contact);
    }
  }

  function reset() {
    setName('');
    setNumber('');
  }

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Popover
        id="contactForm"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          mx="auto"
          component="form"
          noValidate
          onSubmit={onFormSubmit}
          sx={{
            p: '10px',
            width: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography component="h2" variant="h4">
            Add contact
          </Typography>
          <TextField
            margin="normal"
            required
            id="contactName"
            label="Name"
            name="contactName"
            type="text"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
              setNameError(null);
            }}
            sx={{ width: '300px' }}
            error={nameError && true}
            helperText={nameError}
          />
          <TextField
            margin="normal"
            required
            id="contactNumber"
            label="Number"
            name="contactNumber"
            type="tel"
            value={number}
            onChange={({ target }) => {
              setNumber(target.value);
              setNumberError(null);
            }}
            sx={{ width: '300px' }}
            error={numberError && true}
            helperText={numberError}
          />
          <Button
            variant="contained"
            mx="auto"
            type="submit"
            sx={{ width: '100px' }}
          >
            Submit
          </Button>
        </Box>
      </Popover>

      <IconButton
        sx={{ width: '50px', height: '50px', mt: '15px' }}
        edge="end"
        aria-label="add"
        onClick={handleClick}
        aria-describedby="contactForm"
      >
        <AddCircleIcon
          sx={{
            width: '50px',
            height: '50px',
            color: 'primary.main',
            '&:hover': { color: 'primary.dark' },
          }}
        />
      </IconButton>
    </Box>
  );
}
