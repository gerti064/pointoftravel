// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Header lives in components/dashboard/
import Header from './components/dashboard/Header';

// Pages also under components/
import Home from './components/dashboard/Home';
import About from './components/about/About';
import Shop from './components/shop/Shop';
import Categories from './components/categories/Categories';
import Service from './components/service/Service';
import Contact from './components/contact/Contact';

import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          {/* If you want a 404 page later:
            <Route path="*" element={<NotFound />} />
          */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
