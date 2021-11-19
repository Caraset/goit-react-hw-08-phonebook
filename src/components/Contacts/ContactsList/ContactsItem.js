import { PropTypes } from 'prop-types';
import { ListItem, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteContactMutation } from 'redux/phonebook';

export default function ContactsItem({ contact: { id, name, number } }) {
  const [deleteContact] = useDeleteContactMutation();

  return (
    <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{
            mr: '25px',
            fontSize: '20px',
            wordSpacing: '8px',
            '&::first-letter': { textTransform: 'uppercase' },
          }}
        >
          {name}:{' '}
        </Typography>
        <Typography
          sx={{ mr: '25px', fontSize: '20px', color: 'primary.dark' }}
        >
          {number}
        </Typography>
      </Box>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => deleteContact(id)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

ContactsItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
