import type { SocialNetwork } from '../types';

import { useUserContext } from '../contexts/UserContext';

const HandleView = () => {
  const { user } = useUserContext();

  if (!user) {
    return null; // This shouldn't happen due to layout's error handling
  }

  const links: SocialNetwork[] = JSON.parse(user.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <div className="space-y-6 text-white">
      <div className="bg-slate-900 rounded-lg p-4 mx-auto full-w border border-slate-700 shadow-lg overflow-hidden">
        <div className="font-mono">
          <span className="text-green-400">$ user</span>
          <span className="text-blue-400"> --name</span>
          <p className="text-4xl text-center font-black mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            @{user.handle}
          </p>
        </div>
      </div>

      {user.image ? (
        <img src={user.image} className="max-w-[250px] mx-auto rounded-full" />
      ) : (
        <div className="w-[250px] h-[250px] mx-auto rounded-full bg-slate-700 flex items-center justify-center">
          <span className="text-8xl font-bold text-slate-500">
            {user.handle.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="bg-slate-900 rounded-lg p-4 mx-auto full-w border border-slate-700 shadow-lg overflow-hidden">
        <div className="font-mono">
          <span className="text-green-400">$ user</span>
          <span className="text-blue-400"> --bio</span>
          <div className="mt-2 text-cyan-300 text-lg text-center">
            <span className="text-yellow-400">"</span>
            {user.description}
            <span className="text-yellow-400">"</span>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt="imagen red social"
                className="w-12"
              />
              <p className="text-black capitalize font-bold text-lg">
                Visit my: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center">No available links yet...</p>
        )}
      </div>
    </div>
  );
};

export default HandleView;
