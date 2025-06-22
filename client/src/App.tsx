import { Route, Routes } from 'react-router';

import paths from './utils/paths.ts';
import LoginView from './views/LoginView.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import RegisterView from './views/RegisterView.tsx';

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={paths.auth.login()} element={<LoginView />} />
        <Route path={paths.auth.register()} element={<RegisterView />} />
      </Route>
    </Routes>
  );
};

export default App;
