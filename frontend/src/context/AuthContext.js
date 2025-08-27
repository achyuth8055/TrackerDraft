import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    // This effect runs when the component loads to restore authentication state
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');
                
                if (storedToken && storedUser) {
                    // Parse the stored user data
                    const userData = JSON.parse(storedUser);
                    
                    // TODO: Optionally verify token with backend here
                    // const isValidToken = await verifyToken(storedToken);
                    // if (isValidToken) {
                    
                    setToken(storedToken);
                    setUser(userData);
                    // }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                // Clear invalid data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // --- Login Function ---
    const loginAction = (data) => {
        try {
            const { token: newToken, ...userData } = data;
            
            // Update state
            setUser(userData);
            setToken(newToken);
            
            // Persist to localStorage
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // --- Logout Function ---
    const logoutAction = () => {
        // Clear state
        setUser(null);
        setToken(null);
        
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Navigate to login
        navigate('/login');
    };

    // --- Token Verification Function (optional) ---
    const verifyToken = async (tokenToVerify) => {
        try {
            const response = await fetch('http://localhost:5001/api/verify-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenToVerify}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.ok;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            token, 
            user, 
            isLoading, 
            loginAction, 
            logoutAction,
            verifyToken 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;