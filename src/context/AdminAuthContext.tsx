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
  setAdminId: (v: number | null) => void;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AuthCtx | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await fetch(`${API_BASE}/admin/checkAuth.php`, {
          credentials: 'include',
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.isAuthenticated) {
            setIsAdmin(true);
            setAdminId(data.adminId ?? null);
          } else {
            setIsAdmin(false);
            setAdminId(null);
          }
        } else {
          setIsAdmin(false);
          setAdminId(null);
        }
      } catch (e) {
        console.error('Error checking admin auth:', e);
        setIsAdmin(false);
        setAdminId(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_BASE]);

  const logout = async () => {
    try {
      const resp = await fetch(`${API_BASE}/admin/logout.php`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await resp.json();
      if (!data.success) {
        console.warn('Logout request returned false:', data.message);
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsAdmin(false);
      setAdminId(null);
    }
  };

  if (loading) return <div>Checking admin session...</div>;

  return (
    <AdminAuthContext.Provider value={{ isAdmin, adminId, setIsAdmin, setAdminId, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
