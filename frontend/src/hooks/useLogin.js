import { useState } from 'react';
import { useAuthContext } from './useAuthContext.js';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
                return;
            }
            
            // save the user to localStorage
            localStorage.setItem('user', JSON.stringify(json));

            // update auth context
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);

        } catch (err) {
            setIsLoading(false);
            setError("Something went wrong. Please try again.");
            console.error("Login error:", err);
        }
    };

    return { login, isLoading, error };
};
