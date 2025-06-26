import { Route, Routes } from 'react-router';

import paths from './utils/paths.ts';
import LoginView from './views/LoginView.tsx';
import AdminLayout from './layouts/AdminLayout.tsx';
import SimpleLayout from './layouts/SimpleLayout.tsx';
import ProfileView from './views/ProfileView.tsx';
import LinkTreeView from './views/LinkTreeView.tsx';
import RegisterView from './views/RegisterView.tsx';
import GeneralLayout from './layouts/GeneralLayout.tsx';
import HandleView from './views/HandleView.tsx';
import NotFoundView from './views/NotFoundView.tsx';

const App = () => {
  return (
    <Routes>
      <Route element={<SimpleLayout />}>
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

      <Route path={paths.notFound()} element={<SimpleLayout />}>
        <Route index element={<NotFoundView />} />
      </Route>
    </Routes>
  );
};

export default App;
