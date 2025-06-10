// src/components/about/About.tsx
import React from 'react';
import foto1 from '../../assets/foto1.jpg';
import './About.css'; // Import your new CSS file
const About: React.FC = () => {
  return (
    <section className="about-section">
         <h1 className="about-title">
                           <img
             
              src={foto1}
              alt="overlay"
              className="root-overlay-image"
            />
          {/* Create a container for the image and text */}
          <div className="about-title-image-container">
 
            {/* The text you want to overlay */}
            <span className="about-image-overlay-text" ><h2 className='lato-bold-italic'>
              About Point of Travel
              </h2>
            </span>
          </div>
        </h1>

        <p className="about-intro">
          Point of Travel was founded to help you explore the world effortlessly. Our mission is to curate memorable experiences, provide expert guidance, and make every journey uniquely yours.
        </p>

         <div className="about-grid">
          <div className="about-subsection">
            <h2 className="about-subtitle">Our Mission</h2>
            <p className="about-text">
Our mission as a travel agency is to be your trusted partner in crafting unforgettable journeys. We strive to simplify the complexities of travel planning, offering personalized advice and exclusive access to the best destinations, accommodations, and experiences worldwide. Our goal is to ensure every trip, whether for leisure or business, is seamless, enjoyable, and exceeds your expectations, ultimately enriching your life through the power of exploration and discovery.
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

    </section>
  );
};

export default About;
