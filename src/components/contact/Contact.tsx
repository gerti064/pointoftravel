import React, { useState, FormEvent } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./contact.css";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://www.facebook.com/yourpage", label: "Facebook" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/yourpage", label: "Instagram" },
  { icon: <FaTwitter />, href: "https://twitter.com/yourhandle", label: "X (Twitter)" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: <FaWhatsapp />, href: "https://wa.me/1234567890", label: "WhatsApp" },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/contact/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      alert(`Thanks, ${form.name}! Your message has been sent.`);
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message: " + data.message);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("There was an error sending your message.");
  }
};


  return (
    <div className="contact-container">
      <h1 className="contact-title lato-bold">Get in Touch</h1>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-item lato-regular">
            <FaMapMarkerAlt className="info-icon" />
            <span>123 Your Street, Your City, Your Country</span>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <div>
              <a href="tel:+1234567890" className="info-link lato-reular">+1 (234) 567-890</a>
              <a href="tel:+0987654321" className="info-link lato-regular">+0 (987) 654-321</a>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <a href="mailto:info@yourdomain.com" className="info-link">info@yourdomain.com</a>
          </div>

          <div className="social-section">
            <h2 className="section-title lato-bold">Follow Us</h2>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-wrap"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="map-section">
            <h2 className="section-title">Our Location</h2>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086814620724!2d-122.41941568468121!3d37.77492977975979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f1d4e299%3A0x5b4e8099ab0b50e1!2sYour%20Business%20Place!5e0!3m2!1sen!2sus!4v1625068991230"
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                title="Our Location"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="form-input lato-regular"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input lato-regular"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="form-textarea lato-regular"
            />
          </div>
          <button type="submit" className="form-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
