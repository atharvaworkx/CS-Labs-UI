import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, 
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube 
} from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      content: 'support@cslabs.com',
      subtext: 'We reply within 24 hours'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      content: '+91 98765 43210',
      subtext: 'Mon-Sat 9AM to 6PM'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      content: 'Bangalore, Karnataka',
      subtext: 'India - 560001'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', color: '#1877F2' },
    { icon: FaTwitter, url: '#', color: '#1DA1F2' },
    { icon: FaLinkedin, url: '#', color: '#0A66C2' },
    { icon: FaInstagram, url: '#', color: '#E4405F' },
    { icon: FaYoutube, url: '#', color: '#FF0000' }
  ];

  return (
    <div className="contact-container">
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-hero-content">
          <motion.h1
            className="contact-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            className="contact-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </motion.section>

      <section className="contact-content">
        <div className="contact-container-inner">
          <div className="contact-info-cards">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  className="contact-info-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 15px 40px rgba(106, 13, 37, 0.15)' }}
                >
                  <div className="info-icon">
                    <Icon />
                  </div>
                  <h3 className="info-title">{info.title}</h3>
                  <p className="info-content">{info.content}</p>
                  <p className="info-subtext">{info.subtext}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="contact-main">
            <motion.div
              className="contact-form-section"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-subtitle">Fill out the form below and we'll get back to you shortly</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your query..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(106, 13, 37, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message <FaPaperPlane />
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              className="contact-side-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="side-info-card">
                <h3 className="side-info-title">Why Choose CS Labs?</h3>
                <ul className="side-info-list">
                  <li>✓ Expert faculty with years of teaching experience</li>
                  <li>✓ Comprehensive study material & practice questions</li>
                  <li>✓ Regular mock tests & performance analysis</li>
                  <li>✓ 24/7 doubt solving support</li>
                  <li>✓ Proven track record of GATE toppers</li>
                  <li>✓ Affordable pricing with flexible plans</li>
                </ul>
              </div>

              <div className="side-info-card">
                <h3 className="side-info-title">Follow Us</h3>
                <p className="social-text">Stay connected for updates, tips, and more!</p>
                <div className="social-links">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        className="social-link"
                        style={{ '--social-color': social.color }}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="side-info-card support-hours">
                <h3 className="side-info-title">Support Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="day">Monday - Friday</span>
                    <span className="time">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Saturday</span>
                    <span className="time">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Sunday</span>
                    <span className="time">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
