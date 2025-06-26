import { Toaster } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams, Outlet } from 'react-router';

import Logo from '../components/Logo.tsx';
import { getUserByHandleHttp } from '../services/usersApi.ts';
import PublicProfileSkeleton from '../components/PublicProfileSkeleton.tsx';
import { UserContext } from '../contexts/UserContext.tsx';

const GeneralLayout = () => {
  const params = useParams();
  const handle = params.handle!;
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getUserByHandleHttp(handle),
    queryKey: ['handle', handle],
    retry: 1,
  });

  // Show loading state first
  if (isLoading) {
    return (
      <div className="bg-slate-800 min-h-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <Logo />
          <div className="py-10">
            <PublicProfileSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return <Navigate to={'/404'} />;
  }

  return (
    <>
      <div className="bg-slate-800 min-h-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <Logo />
          <div className="py-10">
            <UserContext.Provider value={{ user }}>
              <Outlet />
            </UserContext.Provider>
          </div>
        </div>

        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default GeneralLayout;
