import type { ReactNode } from 'react';

type ErrorMessageProps = {
  children: ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <p className="bg-red-50 text-red-600 p-1 text-xs text-center">{children}</p>
  );
};

export default ErrorMessage;
