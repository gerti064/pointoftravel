// File: src/components/admin/AdminLogout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutResponse {
  success: boolean;
  message: string;
}

export default function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/logout.php', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          // We do not need a request body for logout
        });

        if (resp.ok) {
          const data: LogoutResponse = await resp.json();
          console.log(data.message);
        } else {
          console.warn('Logout request failed');
        }
      } catch (err) {
        console.error('Error logging out:', err);
      } finally {
        // In any case, redirect to the login page
        navigate('/admin/login');
      }
    })();
  }, [navigate]);

  // While logout is in progress, you can show a spinner or a message. 
  return <div>Logging out…</div>;
}
