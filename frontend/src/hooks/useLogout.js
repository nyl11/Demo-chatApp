import { useAuthContext } from './useAuthContext.js';

// Hook for logging out the user
export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');

    // Dispatch logout action to context
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
