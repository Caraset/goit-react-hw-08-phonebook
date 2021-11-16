import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/selectors';
import { Box } from '@mui/material/';
import AuthForm from 'components/AuthForm';
import SubNavigation from 'components/SubNavigation';

export default function LoginView() {
  const token = useSelector(getToken);
  console.log(token);
  return (
    <>
      {token ? (
        <Navigate to="/contacts" />
      ) : (
        <Box className="formContainer">
          <SubNavigation />
          <Routes>
            <Route path="*" element={<Navigate to="login" />} />
            <Route path="login" element={<AuthForm />} />
            <Route path="registration" element={<AuthForm />} />
          </Routes>
        </Box>
      )}
    </>
  );
}

// TODO: сделал регистрацию и сохранение токена в стейт, сделал редирект если пользователь залогинен на контакты
// нужно сделать редирект не залогиненого пользователя на страницу логина
