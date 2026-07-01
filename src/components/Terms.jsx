import React from 'react';
import '../styles/Legal.css';

const Terms = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <h1>Terms & Conditions</h1>
        <p className="last-updated">Last Updated: June 29, 2026</p>
        
        <p>Welcome to CS Labs. These Terms & Conditions govern your use of our website and the purchase of our educational mentorship programs. By accessing our site and purchasing our services, you agree to be bound by these terms.</p>

        <h2>1. Services Provided</h2>
        <p>We offer online educational mentorship and training programs (e.g., GATE CSE Mentorship). The details, syllabus, and pricing of each program are clearly listed on our website.</p>

        <h2>2. User Obligations</h2>
        <p>You agree to provide accurate registration information and maintain the confidentiality of your login credentials or access links. Our program materials are for personal use only and may not be distributed or resold.</p>

        <h2>3. Pricing and Payments</h2>
        <p>All prices are listed in INR (Indian Rupees). We reserve the right to modify pricing for future batches, but any enrolled student's payment plan (including approved EMIs) will be honored at the time of purchase.</p>

        <h2>4. Code of Conduct</h2>
        <p>We reserve the right to suspend or terminate access to live classes, community groups, or technical repositories if a student engages in disruptive behavior, harassment, or unauthorized sharing of proprietary materials.</p>

        <h2>5. Contact Information</h2>
        <p>For any questions regarding these Terms, please contact us at:</p>
        {/* <p><strong>Email:</strong> support@cslabs.com</p> */}
        <p><strong>Phone:</strong> +91 98765 43210</p>
      </div>
    </div>
  );
};

export default Terms;
