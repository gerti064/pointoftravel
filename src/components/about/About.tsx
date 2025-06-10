// src/components/about/About.tsx
import React from 'react';
import foto1 from '../../assets/foto1.jpg';
import './About.css'; // Import your new CSS file

const About: React.FC = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">
          <img
            src={foto1}
            alt="foto1"
            className="about-title-image"
          />
          
          About Point of Travel
        </h1>

        <p className="about-intro">
          Point of Travel was founded to help you explore the world effortlessly. Our mission is to curate memorable experiences, provide expert guidance, and make every journey uniquely yours.
        </p>

        <div className="about-grid">
          <div className="about-subsection">
            <h2 className="about-subtitle">Our Mission</h2>
            <p className="about-text">
              To connect travelers with authentic, life-changing adventures while supporting local communities and sustainable practices.
            </p>
          </div>

          <div className="about-subsection">
            <h2 className="about-subtitle">Our Vision</h2>
            <p className="about-text">
              To be the most trusted travel partner, guiding explorers toward unforgettable experiences around the globe.
            </p>
          </div>
        </div>

        <div className="team-section">
          <h2 className="team-title">Meet the Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <h3 className="team-name">Alice Johnson</h3>
              <p className="team-role">CEO &amp; Founder</p>
              <p className="team-description">
                Alice is a seasoned traveler and entrepreneur who started Point of Travel to share her passion for exploration with the world.
              </p>
            </div>

            <div className="team-card">
              <h3 className="team-name">Mark Lee</h3>
              <p className="team-role">Head of Operations</p>
              <p className="team-description">
                Mark ensures every trip runs smoothly, leveraging his years of experience in hospitality and logistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
