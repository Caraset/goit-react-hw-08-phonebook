import './App.css';
// import Container from 'components/Container';
import { Container } from '@mui/material';
import Form from 'components/Form';
import Filter from 'components/Filter';
import Contacts from 'components/Contacts';

import { ToastContainer } from 'react-toastify';

import { Route, Routes } from 'react-router';
import AuthView from 'views/AuthView';

function App() {
  return (
    <>
      <Container sx={{ display: 'inline-block' }} fixed>
        <Routes>
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
