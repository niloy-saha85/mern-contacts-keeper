import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const auth = useAuth();
  const { isAuthenticated } = auth;
  console.log(isAuthenticated);

  const location = useLocation();

  return (
    // <p>Hello</p>
    isAuthenticated ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;