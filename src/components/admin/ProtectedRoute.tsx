// File: src/components/admin/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface CheckAuthResponse {
  isAuthenticated: boolean;
  adminId: number | null;
}

/**
 * Wrap your admin routes with <ProtectedRoute> so that only
 * authenticated admins can see them. If not authenticated, we
 * redirect to "/admin/login".
 *
 * Usage:
 *   <Route path="/admin/dashboard" element={
 *     <ProtectedRoute>
 *       <AdminDashboard />
 *     </ProtectedRoute>
 *   } />
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/checkAuth.php', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!resp.ok) {
          setIsAuth(false);
        } else {
          const data: CheckAuthResponse = await resp.json();
          setIsAuth(data.isAuthenticated);
        }
      } catch (err) {
        console.error('checkAuth error:', err);
        setIsAuth(false);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    // Optionally render a spinner or “Checking…” message
    return <div>Loading…</div>;
  }

  if (!isAuth) {
    // If not authenticated, redirect to the login page:
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child(ren):
  return <>{children}</>;
}
