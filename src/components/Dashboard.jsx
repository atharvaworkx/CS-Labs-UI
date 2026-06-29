import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaChartLine, FaUser } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="dashboard-header">
          <motion.div
            className="welcome-icon"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <FaGraduationCap />
          </motion.div>
          <h1>Welcome to Your Dashboard!</h1>
          <p>Your learning journey begins here.</p>
        </div>

        <div className="dashboard-grid">
          <motion.div
            className="dashboard-card"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="card-icon">
              <FaBook />
            </div>
            <h3>My Courses</h3>
            <p>Access your enrolled courses</p>
          </motion.div>

          <motion.div
            className="dashboard-card"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="card-icon">
              <FaChartLine />
            </div>
            <h3>Progress</h3>
            <p>Track your learning progress</p>
          </motion.div>

          <motion.div
            className="dashboard-card"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="card-icon">
              <FaUser />
            </div>
            <h3>Profile</h3>
            <p>Manage your account settings</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
