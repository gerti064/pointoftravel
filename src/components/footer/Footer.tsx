// src/components/Footer.tsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './footer.css';
 
const Footer: React.FC = () => {
  return (
    <footer className="pt-footer">
      <div className="pt-footer-container">
        {/* Brand + social */}
        <div className="pt-footer-section">
          <h4 className="pt-footer-title lato-bold">Point of Travel</h4>
          <p className="pt-footer-text lato-regular">
            Your gateway to unforgettable journeys around the world.
          </p>
          <div className="pt-footer-social">
            <a href="https://www.facebook.com/profile.php?id=100090808746160" className="pt-footer-social-link"><FaFacebookF /></a>
            <a href="#" className="pt-footer-social-link"><FaTwitter /></a>
            <a href="https://www.instagram.com/pointoftravel.mk/" className="pt-footer-social-link"><FaInstagram /></a>
            <a href="#" className="pt-footer-social-link"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Destinations */}
        <div className="pt-footer-section">
          <h5 className="pt-footer-subtitle lato-bold">Destinations</h5>
          <ul className="pt-footer-list lato-regular">
            <li><a href="#">Europe</a></li>
            <li><a href="#">Asia</a></li>
            <li><a href="#">Americas</a></li>
            <li><a href="#">Africa</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="pt-footer-section">
          <h5 className="pt-footer-subtitle lato-bold">Services</h5>
          <ul className="pt-footer-list lato-regular">
            <li><a href="#">Flight Booking</a></li>
            <li><a href="#">Hotel Reservations</a></li>
            <li><a href="#">Car Rentals</a></li>
            <li><a href="#">Guided Tours</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="pt-footer-section">
          <h5 className="pt-footer-subtitle lato-bold">Company</h5>
          <ul className="pt-footer-list lato-regular">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="pt-footer-section">
          <h5 className="pt-footer-subtitle lato-bold">Legal</h5>
          <ul className="pt-footer-list lato-regular">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-footer-bottom lato-regular">
        <p>© {new Date().getFullYear()} Point of Travel. All rights reserved.</p>
        <ul className="pt-footer-bottom-links">
          <li><a href="#">Accessibility</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
