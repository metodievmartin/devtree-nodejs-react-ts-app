import { Link, Outlet } from 'react-router';
import { useEffect, useState } from 'react';

import type { SocialNetwork, User } from '../types';

import DevTreeLink from '../components/DevTreeLink.tsx';
import NavigationTabs from '../components/NavigationTabs.tsx';

interface DevTreeMainViewProps {
  user: User;
}

/**
 * Main view component for the DevTree application
 * Contains the profile link, main content area with Outlet, and user sidebar
 */
const DevTreeMainView = ({ user }: DevTreeMainViewProps) => {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(user.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(user.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [user]);

  return (
    <>
      <NavigationTabs />

      <div className="flex justify-end">
        <Link
          className="font-bold text-right text-slate-800 text-2xl"
          to={`/profile/${user.handle}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Visit my profile /{user.handle}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-10 mt-10">
        <div className="flex-1">
          <Outlet />
        </div>

        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
          <p className="text-4xl text-center text-white">{user.handle}</p>

          {user.image && (
            <img
              src={user.image}
              alt="Imagen Perfil"
              className="mx-auto max-w-[250px]"
            />
          )}

          <p className="text-center text-lg font-black text-white">
            {user.description}
          </p>

          <div className="mt-20 flex flex-col gap-5">
            {enabledLinks.map((link) => (
              <DevTreeLink key={link.name} link={link} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DevTreeMainView;
