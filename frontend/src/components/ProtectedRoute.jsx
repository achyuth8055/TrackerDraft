import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token, isLoading } = useContext(AuthContext);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0D1117',
        color: '#C9D1D9',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderTop: '4px solid #00BFFF',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}></div>
          <p>Loading...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // If a token exists, the user is authenticated.
  if (token) {
    return <Outlet />;
  }

  // If no token exists, redirect to login.
  return <Navigate to="/login" />;
};

export default ProtectedRoute;