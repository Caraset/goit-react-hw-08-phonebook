import Filter from 'components/Filter';
import Contacts from 'components/Contacts';
import { Box } from '@mui/material';
import ContactForm from 'components/ContactForm';

export default function ContactsView() {
  return (
    <Box sx={{ p: '60px 0' }}>
      <Filter />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: '20px 0',
        }}
      >
        <ContactForm />
        <Contacts />
      </Box>
    </Box>
  );
}
