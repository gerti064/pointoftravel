// File: src/components/admin/ProtectedAdminRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const { isAdmin, setIsAdmin } = useAdminAuth();
  const location = useLocation();

  useEffect(() => {
    // You can add auth re-check logic here if needed in the future
    // e.g., fetch('/api/admin/checkAuth.php')...
  }, []);

  // Still loading, don't render anything yet
  if (isAdmin === null) return null;

  // If not admin, redirect to login with redirect back path
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
