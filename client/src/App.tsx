import { Route, Routes } from 'react-router';

import paths from './utils/paths.ts';
import LoginView from './views/LoginView.tsx';
import AdminLayout from './layouts/AdminLayout.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import ProfileView from './views/ProfileView.tsx';
import LinkTreeView from './views/LinkTreeView.tsx';
import RegisterView from './views/RegisterView.tsx';
import GeneralLayout from './layouts/GeneralLayout.tsx';
import HandleView from './views/HandleView.tsx';

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={paths.auth.login()} element={<LoginView />} />
        <Route path={paths.auth.register()} element={<RegisterView />} />
      </Route>

      <Route path={paths.admin.index()} element={<AdminLayout />}>
        <Route index element={<LinkTreeView />} />
        <Route
          path={paths.admin.profile({ relative: true })}
          element={<ProfileView />}
        />
      </Route>

      <Route path={paths.userProfile(':handle')} element={<GeneralLayout />}>
        <Route index element={<HandleView />} />
      </Route>
    </Routes>
  );
};

export default App;
