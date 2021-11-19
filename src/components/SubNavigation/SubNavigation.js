import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import s from './SubNavigation.module.css';

export default function SubNavigation() {
  const activeClass = [s.subLink, s.active];
  return (
    <Box sx={{ display: 'inline-flex' }}>
      <NavLink
        to="login"
        className={({ isActive }) =>
          isActive ? activeClass.join(' ') : s.subLink
        }
      >
        <Typography sx={{ color: 'primary.contrastText' }}>Login</Typography>
      </NavLink>
      <NavLink
        to="registration"
        className={({ isActive }) =>
          isActive ? activeClass.join(' ') : s.subLink
        }
      >
        <Typography sx={{ color: 'primary.contrastText' }}>
          Registration
        </Typography>
      </NavLink>
    </Box>
  );
}
