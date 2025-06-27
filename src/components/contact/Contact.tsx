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
  { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=100090808746160", label: "Facebook" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/pointoftravel.mk/", label: "Instagram" },
  { icon: <FaTwitter />, href: "https://twitter.com/yourhandle", label: "X (Twitter)" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: <FaWhatsapp />, href: "https://wa.me/1234567890", label: "WhatsApp" },
];

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = { name, email, message };

    try {
      const response = await fetch("http://localhost/pointoftravel/public/api/contact/add_messages.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
       
      if (data.success) {
        alert(`Thanks, ${name}! Your message has been sent.`);
        setName("");
        setEmail("");
        setMessage("");
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
            <span>29 Noemvri br.3, Tetovo, North Macedonia</span>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <div>
              <a href="tel:+38970627447" className="info-link lato-regular">+389 70 627 447</a>
              <a href="tel:+38971800093" className="info-link lato-regular">+389 71 800 093</a>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <a href="mailto:pointoftravel@outlook.com" className="info-link">pointoftravel@outlook.com</a>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.700551878516!2d20.9689266!3d42.006701699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353f0eb66a20017%3A0x878f100908ba48f2!2zMjkgTsOrbnRvcmkgMywgVGV0b3bDqyAxMjIw!5e0!3m2!1sen!2smk!4v1750945065018!5m2!1sen!2smk"
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                title="Our Location"
              ></iframe>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
