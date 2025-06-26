import { createContext, useContext } from 'react';

import type { User } from '../types';

interface UserContextType {
  user: User | null;
}

// Create context with default value
export const UserContext = createContext<UserContextType>({ user: null });

// Custom hook for using the context
export const useUserContext = () => useContext(UserContext);
