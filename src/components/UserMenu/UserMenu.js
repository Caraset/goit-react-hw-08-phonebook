import { Button, Box, Typography, Avatar } from '@mui/material';

import { useLogOutUserMutation, useGetCurrentUserQuery } from 'redux/phonebook';
import { useSelector } from 'react-redux';

import SubNavigation from 'components/SubNavigation';
import { getIsLoggedIn, selectCurrentUser } from 'redux/auth/authSelectors';

export default function UserMenu() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const [logOut] = useLogOutUserMutation();
  const { isFetching } = useGetCurrentUserQuery();
  return (
    <Box
      sx={{
        p: '0 20px',
        height: '80px',
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {isFetching ? (
        ''
      ) : (
        <>
          {isLoggedIn ? (
            <Button
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
              onClick={logOut}
            >
              Log out
            </Button>
          ) : (
            <SubNavigation />
          )}
          {isLoggedIn && (
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  color: 'primary.contrastText',
                  textAlign: 'right',
                  mr: '20px',
                }}
              >
                <Typography>{user.name}</Typography>
                <Typography>{user.email}</Typography>
              </Box>
              <Avatar
                alt={user.name}
                src="*"
                sx={{ width: '50px', height: '50px' }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
