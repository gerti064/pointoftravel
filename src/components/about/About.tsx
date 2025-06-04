// src/components/about/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="pt-16 pb-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-black mb-4">
          About Point of Travel
        </h1>
        {/* Intro Paragraph */}
        <p className="text-lg text-black mb-8">
          Point of Travel was founded to help you explore the world effortlessly. Our mission is to curate memorable experiences, provide expert guidance, and make every journey uniquely yours.
        </p>

        {/* Core Values */}
        <div className="grid sm:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-2xl font-semibold text-black mb-2">
              Our Mission
            </h2>
            <p className="text-black">
              To connect travelers with authentic, life-changing adventures while supporting local communities and sustainable practices.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-black mb-2">
              Our Vision
            </h2>
            <p className="text-black">
              To be the most trusted travel partner, guiding explorers toward unforgettable experiences around the globe.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-black mb-6">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Team Member 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-black mb-1">
                Alice Johnson
              </h3>
              <p className="text-black text-sm mb-2">CEO &amp; Founder</p>
              <p className="text-black text-sm">
                Alice is a seasoned traveler and entrepreneur who started Point of Travel to share her passion for exploration with the world.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-black mb-1">
                Mark Lee
              </h3>
              <p className="text-black text-sm mb-2">Head of Operations</p>
              <p className="text-black text-sm">
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
