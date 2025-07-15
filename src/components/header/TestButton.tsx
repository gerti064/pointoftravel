// src/components/common/TestButton.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const TestButton: React.FC = () => {
  return (
    <NavLink
      to="/admin/login"
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      Admin
    </NavLink>
  );
};

export default TestButton;
