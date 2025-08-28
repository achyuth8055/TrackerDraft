import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PublicRoute = () => {
  const { token } = useContext(AuthContext);

  // If a token exists, the user is logged in, so redirect to the dashboard.
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // If no token, show the public page (Login or SignUp).
  return <Outlet />;
};

export default PublicRoute;