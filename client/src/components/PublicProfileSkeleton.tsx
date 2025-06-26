import React from 'react';

interface HandleViewSkeletonProps {
  className?: string;
}

/**
 * A loading skeleton component that mimics the HandleView layout
 */
const PublicProfileSkeleton: React.FC<HandleViewSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div className={`space-y-6 text-white ${className}`}>
      {/* Code-like terminal skeleton for username/handle */}
      <div className="bg-slate-900 rounded-lg p-4 mx-auto full-w border border-slate-700 shadow-lg overflow-hidden">
        <div className="font-mono">
          <div className="flex">
            <div className="h-5 bg-green-700 w-16 rounded-md animate-pulse"></div>
            <div className="h-5 bg-blue-700 w-20 ml-2 rounded-md animate-pulse"></div>
          </div>
          <div className="h-10 bg-slate-700 w-3/4 mx-auto mt-2 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Profile image skeleton */}
      <div className="h-64 w-64 bg-slate-700 mx-auto rounded-full animate-pulse"></div>

      {/* Code-like terminal skeleton for description */}
      <div className="bg-slate-900 rounded-lg p-4 mx-auto full-w border border-slate-700 shadow-lg overflow-hidden">
        <div className="font-mono">
          <div className="flex">
            <div className="h-5 bg-green-700 w-16 rounded-md animate-pulse"></div>
            <div className="h-5 bg-blue-700 w-20 ml-2 rounded-md animate-pulse"></div>
          </div>
          <div className="h-16 bg-slate-700 w-5/6 mx-auto mt-2 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Links skeleton */}
      <div className="mt-20 flex flex-col gap-6">
        {/* Generate 3 link skeletons */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-slate-700 px-5 py-6 flex items-center gap-5 rounded-lg animate-pulse"
          >
            <div className="w-12 h-12 bg-slate-600 rounded-md"></div>
            <div className="h-6 bg-slate-600 w-3/4 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicProfileSkeleton;
