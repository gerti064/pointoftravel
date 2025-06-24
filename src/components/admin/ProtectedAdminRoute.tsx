import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const { isAdmin } = useAdminAuth();

  if (isAdmin === false) return <Navigate to="/admin/login" />;
  return <>{children}</>;
};

export default ProtectedAdminRoute;
