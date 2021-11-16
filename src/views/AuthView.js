import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material/';
import LoginForm from 'components/LoginForm';
import SubNavigation from 'components/SubNavigation';

export default function LoginView() {
  return (
    <Box className="formContainer">
      <SubNavigation />
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="registration" element={<LoginForm />} />
      </Routes>
    </Box>
  );
}
