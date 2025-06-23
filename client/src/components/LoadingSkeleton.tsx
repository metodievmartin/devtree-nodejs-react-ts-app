import React from 'react';

interface LoadingSkeletonProps {
  height?: string;
  width?: string;
  message?: string;
  className?: string;
}

/**
 * A generic loading skeleton component
 * Can be customised with different heights, widths, and messages
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  height = 'h-40',
  width = 'w-full',
  message = 'Loading...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${height} ${width} ${className}`}>
      {/* Header skeleton */}
      <div className="bg-slate-800 py-8 w-full">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full md:w-1/3 p-5 lg:p-0">
            <div className="h-10 bg-slate-700 rounded-md animate-pulse"></div>
          </div>
          <div className="md:w-1/3 md:flex md:justify-end p-5 lg:p-0">
            <div className="h-8 w-24 bg-slate-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 bg-gray-100 py-10">
        <div className="mx-auto max-w-5xl p-10 md:p-0">
          {/* Navigation tabs skeleton */}
          <div className="flex space-x-2 mb-6">
            <div className="h-8 w-24 bg-slate-300 rounded-md animate-pulse"></div>
            <div className="h-8 w-24 bg-slate-300 rounded-md animate-pulse"></div>
            <div className="h-8 w-24 bg-slate-300 rounded-md animate-pulse"></div>
          </div>

          {/* Profile link skeleton */}
          <div className="flex justify-end mb-6">
            <div className="h-8 w-40 bg-slate-300 rounded-md animate-pulse"></div>
          </div>

          {/* Main content skeleton */}
          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1">
              <div className="space-y-4">
                <div className="h-8 bg-slate-300 rounded-md animate-pulse w-3/4"></div>
                <div className="h-24 bg-slate-300 rounded-md animate-pulse"></div>
                <div className="h-8 bg-slate-300 rounded-md animate-pulse w-1/2"></div>
                <div className="h-24 bg-slate-300 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message overlay */}
      {message && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 px-8 py-4 rounded-lg shadow-lg">
            <p className="text-lg font-medium text-slate-600">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSkeleton;
