import { Route, Routes } from 'react-router';

import AuthLayout from './layouts/AuthLayout.tsx';
import LoginView from './views/LoginView.tsx';
import RegisterView from './views/RegisterView.tsx';

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginView />} />
        <Route path="/auth/register" element={<RegisterView />} />
      </Route>
    </Routes>
  );
};

export default App;
