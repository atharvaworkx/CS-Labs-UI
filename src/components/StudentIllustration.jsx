import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StudentIllustration.css';

const StudentIllustration = () => {
  return (
    <motion.div 
      className="illustration-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <img 
        src="/student-illustration.png"
        alt="Student working on laptop with statistics"
        className="student-illustration-image"
      />
    </motion.div>
  );
};

export default StudentIllustration;
