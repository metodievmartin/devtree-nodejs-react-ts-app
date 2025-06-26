import { Toaster } from 'sonner';
import { Outlet } from 'react-router';

import Logo from '../components/Logo.tsx';

const SimpleLayout = () => {
  return (
    <>
      <div className="bg-slate-800 min-h-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <Logo />

          <div className="py-10">
            <Outlet />
          </div>
        </div>

        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default SimpleLayout;
