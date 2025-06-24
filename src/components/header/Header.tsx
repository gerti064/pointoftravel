// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import LogoImg from '../../assets/logo.png'; // adjust path if needed

type NavItem = {
  name: string;
  to: string;
};

const navItems: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Travel', to: '/travel' },
  { name: 'Contact', to: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/admin/checkAuth.php', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        if (resp.ok) {
          const data = await resp.json();
          setIsAdmin(data.isAuthenticated);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('checkAuth error:', err);
        setIsAdmin(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsAdmin(false);
      navigate('/admin/login');
    }
  };

  // Render a loader while checking auth
  if (isAdmin === null) {
    return (
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-logo">
              <NavLink to="/">
                <img
                  src={LogoImg}
                  alt="Logo"
                  onError={e => { (e.currentTarget as HTMLImageElement).src = '/vite.svg' }}
                />
              </NavLink>
            </div>
            <div>Loading…</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <NavLink to="/">
              <img
                src={LogoImg}
                alt="Logo"
                onError={e => { (e.currentTarget as HTMLImageElement).src = '/vite.svg' }}
              />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {navItems.map(item => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.name}
              </NavLink>
            ))}

            {isAdmin && (
              <>
                <div className="nav-desktop-admin-separator" />
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="admin-logout-button"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <svg
                className="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <nav className={`nav-mobile ${isOpen ? 'show-mobile' : ''}`}>
        {navItems.map(item => (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.name}
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div className="nav-mobile-admin-separator" />
            <NavLink
              to="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Dashboard
            </NavLink>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="admin-logout-button-mobile"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
