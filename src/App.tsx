// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Your existing dashboard header and pages:
import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Travel from './components/travel/Travel';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';


// New imports for Admin authentication:
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard'; // ← create this
import AdminLogout from './components/admin/AdminLogout';

import './App.css';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Always‐visible header (for both public and admin pages) */}
      <Header />

      <main className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          {/* ─────────────── Public (non-admin) routes ─────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/contact" element={<Contact />} />
          {/* ─────────────── Admin Auth routes ─────────────── */}
          {/* 1) Admin login (publicly accessible) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 2) Protected admin dashboard (only if logged in) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 3) Admin logout (only reachable if already authenticated) */}
          <Route
            path="/admin/logout"
            element={
              <ProtectedRoute>
                <AdminLogout />
              </ProtectedRoute>
            }
          />

          {/* ─── If you later want a catch-all 404 page: ─── */}
          {/*
          <Route path="*" element={<NotFound />} />
          */}
        </Routes>
        
      </main>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
