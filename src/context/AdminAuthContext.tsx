// src/context/AdminAuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthCtx = {
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
};

const AdminAuthContext = createContext<AuthCtx | undefined>(undefined);

export const AdminAuthProvider: React.FC = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/checkAuth.php', {
          credentials: 'include',
        });
        if (resp.ok) {
          const data = await resp.json();
          setIsAdmin(data.isAuthenticated);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
