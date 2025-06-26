import { Link } from 'react-router';
import paths from '../utils/paths.ts';

const NotFoundView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 shadow-lg max-w-md w-full">
        <div className="font-mono mb-4">
          <span className="text-red-500">$ error</span>
          <span className="text-yellow-400"> --code</span>
          <p className="text-5xl font-black mt-2 text-white">404</p>
        </div>

        <p className="text-cyan-300 text-xl mb-6">User profile not found</p>

        <div className="bg-slate-800 p-3 rounded font-mono text-sm text-left mb-6">
          <p className="text-green-400">// Possible solutions:</p>
          <p className="text-slate-400">1. Check if the handle is correct</p>
          <p className="text-slate-400">
            2. User may have deleted their profile
          </p>
        </div>

        <Link
          to={paths.home()}
          className="bg-blue-700 text-white py-2 px-4 rounded-lg font-bold inline-block hover:bg-blue-800 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundView;
