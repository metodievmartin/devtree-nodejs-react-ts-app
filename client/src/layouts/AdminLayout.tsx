import { Toaster } from 'sonner';
import { Navigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import paths from '../utils/paths.ts';
import Header from '../components/Header';
import DevTreeMainView from '../views/DevTreeMainView';
import { getMyUserHttp } from '../services/usersApi.ts';
import LoadingSkeleton from '../components/LoadingSkeleton';

const AdminLayout = () => {
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getMyUserHttp,
    queryKey: ['my-user'],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Show loading state first
  if (isLoading) {
    return <LoadingSkeleton height="h-screen" message="Loading user data..." />;
  }

  // If the user is not logged in, redirect to the login page
  if (isError || !currentUser) {
    return <Navigate to={paths.auth.login()} />;
  }

  return (
    <>
      <Header user={currentUser} onLogout={() => {}} />

      <div className="bg-gray-100 min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <DevTreeMainView user={currentUser} />
        </main>
      </div>

      <Toaster position="top-center" />
    </>
  );
};

export default AdminLayout;
