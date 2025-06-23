// src/context/AdminAuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type AuthCtx = {
  isAdmin: boolean;
  adminId: number | null;
  setIsAdmin: (v: boolean) => void;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AuthCtx | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/checkAuth.php', {
          credentials: 'include',
        });
        if (resp.ok) {
          const data = await resp.json();
          setIsAdmin(data.isAuthenticated);
          setAdminId(data.adminId);
        }
      } catch (e) {
        console.error('Error checking admin auth:', e);
        setIsAdmin(false);
        setAdminId(null);
      }
    })();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/admin/logout.php', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsAdmin(false);
      setAdminId(null);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, adminId, setIsAdmin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
