import React, { useState, useContext } from 'react'; // Import useContext
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext'; // Import the AuthContext

const BackArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const { loginAction } = useContext(AuthContext); // Get the login function from context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const resData = await response.json();
            
            if (!resData.success) {
                throw new Error(resData.error || 'Registration failed');
            }
            
            // Use the loginAction from context to log in the user after registration
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
                <button onClick={() => navigate(-1)} className="auth-back-btn" aria-label="Go back">
                    <BackArrowIcon />
                </button>
                
                <h2 className="auth-title">Create Your Account</h2>
                <p className="auth-subtitle">Join Tracker to track your progress.</p>
                
                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-button">Create Account</button>
                </form>
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
