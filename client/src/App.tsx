import { Route, Routes } from 'react-router';

import paths from './utils/paths.ts';
import LoginView from './views/LoginView.tsx';
import AppLayout from './layouts/AppLayout.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import ProfileView from './views/ProfileView.tsx';
import LinkTreeView from './views/LinkTreeView.tsx';
import RegisterView from './views/RegisterView.tsx';

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={paths.auth.login()} element={<LoginView />} />
        <Route path={paths.auth.register()} element={<RegisterView />} />
      </Route>

      <Route path={paths.admin.index()} element={<AppLayout />}>
        <Route index element={<LinkTreeView />} />
        <Route
          path={paths.admin.profile({ relative: true })}
          element={<ProfileView />}
        />
      </Route>
    </Routes>
  );
};

export default App;
