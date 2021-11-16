import './App.css';
import { useSelector } from 'react-redux';
// import Container from 'components/Container';
import { Container } from '@mui/material';
import Form from 'components/Form';
import Filter from 'components/Filter';
import Contacts from 'components/Contacts';

import { ToastContainer } from 'react-toastify';

import { Route, Routes, Navigate } from 'react-router-dom';
import AuthView from 'views/AuthView';
import ContactsView from 'views/ContactsView';
import { useLoginUserMutation } from 'redux/phonebook';
import { getToken } from 'redux/selectors';

function App() {
  return (
    <>
      <Container sx={{ display: 'inline-block' }} fixed>
        <Routes>
          <Route path="/contacts" element={<ContactsView />} />
          <Route path="/*" element={<AuthView />} />
        </Routes>
      </Container>
    </>
    // <>
    //   <h1 className="app__title">Phonebook</h1>
    //   <Container>
    //     <div className="form-container">
    //       <Form />
    //     </div>
    //     <div className="left-side-container">
    //       <div className="phonebook">
    //         <div className="phonebook__container">
    //           <Filter />
    //           <h2 className="app__title">Contacts</h2>
    //           <Contacts />
    //         </div>
    //       </div>
    //     </div>
    //     <ToastContainer />
    //   </Container>
    // </>
  );
}

export default App;
