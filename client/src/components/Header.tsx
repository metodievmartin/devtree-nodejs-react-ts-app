import Logo from './Logo.tsx';
import type { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout?: () => void;
}

const Header = ({ user, onLogout = () => {} }: HeaderProps) => {
  return (
    <header className="bg-slate-800 py-5">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
        <div className="w-full p-5 lg:p-0 md:w-1/3">
          <Logo />
        </div>
        <div className="md:w-1/3 md:flex md:justify-end">
          {user && (
            <button
              className="bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
