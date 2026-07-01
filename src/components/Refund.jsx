import React from 'react';
import '../styles/Legal.css';

const Refund = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <h1>Cancellation & Refund Policy</h1>
        <p className="last-updated">Last Updated: June 29, 2026</p>
        
        <p>Thank you for choosing CS Labs. We strive to provide high-quality educational mentorship. Please read our cancellation and refund policy carefully.</p>

        <h2>1. Refund Eligibility</h2>
        <p>Because our mentorship program limits enrollment to a strict number of seats, all purchases (including full payments and initial EMI installments) are strictly non-refundable. We encourage all students to review the course syllabus and utilize any offered free trial periods before making a financial commitment.</p>

        <h2>2. Cancellation by the Student</h2>
        <p>If you are enrolled in an EMI payment plan, you may cancel your future installments at any time by notifying us in writing. However, canceling future EMIs will immediately revoke your access to ongoing live classes, recorded materials, and private community groups. No refunds will be issued for previously paid installments.</p>

        <h2>3. Cancellation by the Platform</h2>
        <p>In the rare event that we must cancel a specific subject module or the mentorship cohort before it begins, a full refund of the amount paid will be issued to the original payment method within 5-7 business days.</p>
      </div>
    </div>
  );
};

export default Refund;
