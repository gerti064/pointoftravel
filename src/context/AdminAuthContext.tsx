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
  checkAuthStatus: () => Promise<void>; // ✅ Added
};

const AdminAuthContext = createContext<AuthCtx | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const resp = await fetch(`${API_BASE}/admin/checkAuth.php`, {
        credentials: 'include',
      });

      if (resp.ok) {
        const data = await resp.json();
        console.log('[checkAuth.php] Response:', data);

        if (data.isAuthenticated) {
          setIsAdmin(true);
          setAdminId(data.adminId ?? null);
        } else {
          setIsAdmin(false);
          setAdminId(null);
        }
      } else {
        console.warn('[checkAuth.php] Server responded with error:', resp.status);
        setIsAdmin(false);
        setAdminId(null);
      }
    } catch (e) {
      console.error('[checkAuth.php] Network error:', e);
      setIsAdmin(false);
      setAdminId(null);
    }
  };

  useEffect(() => {
    checkAuthStatus().finally(() => setLoading(false));
  }, [API_BASE]);

  const logout = async () => {
    try {
      const resp = await fetch(`${API_BASE}/admin/logout.php`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await resp.json();
      console.log('[logout] Response:', data);

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

  if (loading && showLoader) return <div>Checking admin session...</div>;

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin,
        adminId,
        setIsAdmin,
        setAdminId,
        logout,
        checkAuthStatus, // ✅ Return it from the context
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
