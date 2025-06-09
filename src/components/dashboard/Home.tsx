// src/components/dashboard/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

import slide4 from '../../assets/slide4.jpg';
import slide5 from '../../assets/slide5.jpg';
import slide6 from '../../assets/slide6.webp';
import slide7 from '../../assets/slide7.jpg';

const slides = [
  { id: 1, image: slide4 },
  { id: 2, image: slide5 },
  { id: 3, image: slide6 },
  { id: 4, image: slide7 },
];

const Home: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goTo = (index: number) => {
    clearTimeout(timeoutRef.current);
    setCurrent(index);
  };

  const prevSlide = () => goTo((current - 1 + slides.length) % slides.length);
  const nextSlide = () => goTo((current + 1) % slides.length);

  return (
    <div className='home-section'>
    
      {/* Slider Background */}
      <div className="slider-container">
        <div
          className="slider-wrapper"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s) => (
            <div
              key={s.id}
              className="slide"
              style={{ backgroundImage: `url(${s.image})` }}
            />
          ))}
        </div>
        <button className="slider-arrow prev" onClick={prevSlide}>&#10094;</button>
        <button className="slider-arrow next" onClick={nextSlide}>&#10095;</button>
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`slider-dot${idx === current ? ' active' : ''}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>

      {/* Hero Overlay */}
      <div className="home-container">
        <h1 className=" lato-bold " style={{fontSize:'30px',color:'white',marginTop:'100px '}}>Welcome to, </h1>
        <h1 className="home-title lato-bold-italic" style={{fontSize:'5rem'}}> Point of Travel</h1>
        <p className="home-subtitle">
          Discover amazing destinations, plan your perfect getaway, and book your next adventure—all in one place.
        </p>
        <div className="cta-buttons">
          <Link to="/shop" className="cta-primary">
            Browse Packages
          </Link>
          <Link to="/contact" className="cta-secondary">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Main Content Under Slider */}
      <div className="content-wrapper">
        {/* Featured Cards */}
        <div className="featured-grid">
          {[
            { title: 'Beach Escapes', text: 'Relax on sun-soaked beaches and crystal-clear waters.', bg: 'beach-bg' },
            { title: 'Mountain Adventures', text: 'Find thrills and breathtaking views in the highlands.', bg: 'mountains-bg' },
            { title: 'City Tours', text: 'Immerse yourself in vibrant cultures and historic landmarks.', bg: 'city-bg' },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className={`feature-card-image ${f.bg}`} />
              <div className="feature-card-content">
                <h3 className="feature-card-title">{f.title}</h3>
                <p className="feature-card-text">{f.text}</p>
                <Link to="/categories" className="feature-card-link">
                  Explore {f.title} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <h2 className="newsletter-title">Stay in the Loop</h2>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Testimonials Section */}
        <div className="testimonial-section">
          {[
            { text: "Point of Travel made planning our family vacation effortless. Highly recommend!", author: '– Sarah L.' },
            { text: "Amazing deals and fantastic customer service. We'll be back!", author: '– Mark T.' },
          ].map((t, i) => (
            <div key={i} className="testimonial-item">
              <p className="testimonial-text">{t.text}</p>
              <p className="testimonial-author">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Home;
