import React from 'react';
import '../styles/Legal.css';

const Privacy = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: June 29, 2026</p>
        
        <p>At CS Labs, we prioritize the privacy and security of our students. This Privacy Policy outlines how we collect, use, and protect your information.</p>

        <h2>1. Information We Collect</h2>
        <p>When you register for a course, we collect personal information such as your name, email address, phone number, and payment details.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information strictly to:</p>
        <ul>
          <li>Process your enrollment and payments</li>
          <li>Provide access to course materials, live classes, and developer repositories</li>
          <li>Send important administrative messages (e.g., EMI reminders, class schedules)</li>
          <li>Provide customer support</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>All payments are securely processed through recognized third-party payment gateways (e.g., Razorpay). We do not store your credit card or sensitive banking information on our servers.</p>

        <h2>4. Sharing of Information</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We only share information with trusted service providers (like our payment gateway and communication APIs) necessary to operate our business.</p>
      </div>
    </div>
  );
};

export default Privacy;
