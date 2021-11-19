import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getFilteredContacts } from 'redux/selectors';
import { List, Typography } from '@mui/material';
import ContactsItem from './ContactsItem';

export default function ContactsList({ contacts }) {
  const filteredContacts = useSelector(state =>
    getFilteredContacts(state, contacts),
  );

  return (
    <List sx={{ ml: '15px', width: '500px' }} dense={false}>
      {filteredContacts.length === 0 ? (
        <Typography sx={{ fontSize: '20px' }}>Nothing found</Typography>
      ) : (
        filteredContacts.map(contact => (
          <ContactsItem key={contact.id} contact={{ ...contact }} />
        ))
      )}
    </List>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};
