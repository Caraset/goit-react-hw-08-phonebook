import { Route, Routes } from 'react-router';
import { LoginView } from 'views/AuthView';

export default function Navigation() {
  return (
    <div>
      <Routes>
        <Route to="/" element={LoginView} />
        {/* <Route to ="/contacts" element={}  */}
      </Routes>
    </div>
  );
}
