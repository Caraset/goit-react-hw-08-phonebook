import Loader from 'react-loader-spinner';
import { Box, Typography } from '@mui/material';
import { useGetAllContactsQuery } from 'redux/phonebook';
import ContactsList from './ContactsList';

export default function Contacts() {
  const { data: contacts = [], isFetching } = useGetAllContactsQuery();

  return (
    <Box sx={{ ml: '15px', width: '500px' }}>
      {isFetching ? (
        <Loader type="ThreeDots" color="#be26cc" height={100} width={100} />
      ) : (
        <>
          {contacts.length === 0 ? (
            <Typography sx={{ fontSize: '20px' }}>No contacts added</Typography>
          ) : (
            <ContactsList contacts={contacts} />
          )}
        </>
      )}
    </Box>
  );
}
