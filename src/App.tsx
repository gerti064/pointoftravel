import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AdminAuthProvider } from './context/AdminAuthContext';
import { CategoryProvider } from './context/CategoryContext';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Travel from './components/travel/Travel';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogout from './components/admin/AdminLogout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import './App.css';

const App: React.FC = () => {
  return (
    <AdminAuthProvider>
      <CategoryProvider>
        <BrowserRouter>
          <Header />

          <main className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/logout"
                element={
                  <ProtectedRoute>
                    <AdminLogout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </CategoryProvider>
    </AdminAuthProvider>
  );
};

export default App;
