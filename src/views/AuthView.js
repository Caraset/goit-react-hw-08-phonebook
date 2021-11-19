import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material/';
import AuthForm from 'components/AuthForm';

export default function LoginView() {
  return (
    <Box className="formContainer">
      <Routes>
        <Route path="*" element={<Navigate to="login" />} />
        <Route path="login" element={<AuthForm />} />
        <Route path="registration" element={<AuthForm />} />
      </Routes>
    </Box>
  );
}
