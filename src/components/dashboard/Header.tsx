// src/components/Header/Header.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import LogoImg from '../../assets/logo.png'; // adjust if your path is different

type NavItem = {
  name: string;
  to: string;
};

const navItems: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Shop', to: '/shop' },
  { name: 'Categories', to: '/categories' },
  { name: 'Travel', to: '/travel' },
  { name: 'Contact', to: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/vite.svg';
                }}
              />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              // X icon (SVG)
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
              // Hamburger icon (SVG)
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
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
