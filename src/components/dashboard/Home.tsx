// src/components/dashboard/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <section className="pt-16 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Hero Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Point of Travel
        </h1>
        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8">
          Discover amazing destinations, plan your perfect getaway, and book your next adventure—all in one place.
        </p>
        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Browse Packages
          </Link>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-medium border border-blue-600 rounded-md hover:bg-blue-50 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Featured Section (example cards) */}
      <div className="mt-12 max-w-5xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/featured/?beach')` }} />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Beach Escapes</h3>
            <p className="text-gray-600 text-sm mb-4">
              Relax on sun-soaked beaches and crystal-clear waters.
            </p>
            <Link
              to="/categories"
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              Explore Beaches &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/featured/?mountains')` }} />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Mountain Adventures</h3>
            <p className="text-gray-600 text-sm mb-4">
              Find thrills and breathtaking views in the highlands.
            </p>
            <Link
              to="/categories"
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              Explore Mountains &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/featured/?city')` }} />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">City Tours</h3>
            <p className="text-gray-600 text-sm mb-4">
              Immerse yourself in vibrant cultures and historic landmarks.
            </p>
            <Link
              to="/categories"
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              Explore Cities &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
