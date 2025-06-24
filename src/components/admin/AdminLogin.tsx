// File: src/components/admin/AdminLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  success: boolean;
  message: string;
}

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const resp = await fetch('/api/admin/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: include cookies for PHP session
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (!resp.ok) {
        // If status is 401 or other error
        const errData: LoginResponse = await resp.json();
        setErrorMessage(errData.message || 'Login failed');
        setLoading(false);
        return;
      }

      const data: LoginResponse = await resp.json();
      if (data.success) {
        // Redirect to your admin dashboard or wherever you want:
        navigate('/');
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>

        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ padding: '0.6rem 1.2rem' }}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
