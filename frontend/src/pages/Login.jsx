import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';

const BackArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { loginAction } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const resData = await response.json();
            
            if (!resData.success) {
                throw new Error(resData.error || 'Login failed');
            }

            loginAction(resData);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <motion.div 
                className="auth-card"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                 <button onClick={() => navigate('/')} className="auth-back-btn" aria-label="Go back">
                    <BackArrowIcon />
                </button> 

                <h2 className="auth-title">Welcome Back!</h2>
                <p className="auth-subtitle">Log in to continue your progress.</p>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-button">Log In</button>
                </form>
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
