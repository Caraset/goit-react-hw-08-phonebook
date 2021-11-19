import './App.css';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AuthView from 'views/AuthView';
import ContactsView from 'views/ContactsView';
import { useGetCurrentUserQuery } from 'redux/phonebook';
import PrivateRoute from 'components/PrivateRoad';
import PublicRoute from 'components/PublicRoad';
import UserMenu from 'components/UserMenu';

function App() {
  const { isFetching } = useGetCurrentUserQuery();
  return (
    <>
      <UserMenu />
      <Container sx={{ display: 'inline-block' }} fixed>
        {isFetching ? (
          ''
        ) : (
          <>
            <Routes>
              <Route
                path="contacts"
                element={
                  <PrivateRoute>
                    <ContactsView />
                  </PrivateRoute>
                }
              />

              <Route
                path="*"
                element={
                  <PublicRoute restricted={true}>
                    <AuthView />
                  </PublicRoute>
                }
              />
            </Routes>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
