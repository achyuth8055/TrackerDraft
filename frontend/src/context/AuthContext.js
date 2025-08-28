import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize state directly from localStorage. This is the key part.
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    // This effect synchronizes state changes back to localStorage
    useEffect(() => {
        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [token, user]);

    // --- Login Function ---
    const loginAction = (data) => {
        // Data from the backend already contains token, user info, etc.
        setToken(data.token);
        setUser({ id: data.id, name: data.name, email: data.email });
        navigate('/dashboard');
    };

    // --- Logout Function ---
    const logoutAction = () => {
        setUser(null);
        setToken(null);
        // The useEffect hook will automatically clear localStorage
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;