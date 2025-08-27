import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    // This effect runs when the component loads to check for a stored token
    useEffect(() => {
        if (token) {
            // In a full app, you would decode the token here to get user info
            // For now, we'll just set a placeholder user if a token exists.
            // You would also verify the token with the backend.
            const storedUser = localStorage.getItem('user');
            if(storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [token]);

    // --- Login Function ---
    const loginAction = (data) => {
        const { token, ...userData } = data;
        setUser(userData);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
    };

    // --- Logout Function ---
    const logoutAction = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;