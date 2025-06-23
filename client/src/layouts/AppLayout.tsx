import { Toaster } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router';

import paths from '../utils/paths.ts';
import Header from '../components/Header';
import { getMyUser } from '../services/usersApi.ts';
import LoadingSkeleton from '../components/LoadingSkeleton';
import DevTreeMainView from '../views/DevTreeMainView';

const AppLayout = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getMyUser,
    queryKey: ['my-user'],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Show loading state first
  if (isLoading) {
    return <LoadingSkeleton height="h-screen" message="Loading user data..." />;
  }

  // If the user is not logged in, redirect to the login page
  if (isError || !user) {
    return <Navigate to={paths.auth.login()} />;
  }

  return (
    <>
      <Header user={user} onLogout={() => {}} />

      <div className="bg-gray-100 min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <DevTreeMainView user={user} />
        </main>
      </div>

      <Toaster position="top-center" />
    </>
  );
};

export default AppLayout;
