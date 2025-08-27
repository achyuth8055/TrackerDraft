import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  // If a token exists, the user is authenticated.
  // The <Outlet /> component will render the actual page component (e.g., Dashboard).
  if (token) {
    return <Outlet />;
  }

  // If no token exists, redirect the user to the login page.
  return <Navigate to="/login" />;
};

export default ProtectedRoute;