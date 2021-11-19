import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField } from '@mui/material';

import * as actions from 'redux/actions';
import { getFilter } from 'redux/selectors';

export default function Filter() {
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();

  const setFilter = e => dispatch(actions.changeFilter(e.target.value));

  return (
    <Box>
      <Typography component="h3" variant="h4">
        Find contacts by name
      </Typography>
      <TextField
        margin="normal"
        type="text"
        name="filter"
        onChange={setFilter}
        value={filterValue}
        sx={{ width: '400px' }}
      />
    </Box>
  );
}
