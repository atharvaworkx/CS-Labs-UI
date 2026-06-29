import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import '../styles/StudentIllustration.css';

const StudentIllustration = () => {
  return (
    <div className="illustration-3d-container">
      {/* Stats Cards */}
      <motion.div
        className="stat-card goal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="stat-label">Your Goal</div>
        <div className="stat-value">GATE 2026</div>
        <div className="stat-subtitle">Computer Science</div>
        <svg className="progress-graph" viewBox="0 0 100 30">
          <polyline
            points="0,25 20,20 40,15 60,18 80,10 100,5"
            fill="none"
            stroke="#8A1538"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="5" r="4" fill="#8A1538" />
        </svg>
      </motion.div>

      <motion.div
        className="stat-card streak-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className="flame-emoji">🔥</div>
        <div className="streak-content">
          <div className="streak-label">Practice Streak</div>
          <div className="streak-value">23 Days</div>
        </div>
      </motion.div>

      <motion.div
        className="stat-card solved-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="stat-label">Questions Solved</div>
        <div className="stat-value">1,248</div>
        <div className="stat-subtitle">This Month</div>
        <svg className="mini-chart" viewBox="0 0 100 30">
          <polyline
            points="0,28 15,25 25,22 35,26 50,20 65,23 75,18 85,21 100,15"
            fill="none"
            stroke="#8A1538"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="15" r="3" fill="#8A1538" />
        </svg>
      </motion.div>

      {/* Main 3D Illustration */}
      <div className="main-illustration">
        <img 
          src="https://cdni.iconscout.com/illustration/premium/thumb/student-learning-coding-online-illustration-download-in-svg-png-gif-file-formats--developer-programmer-studying-pack-education-illustrations-6430773.png"
          alt="Student working on laptop"
          className="student-image"
        />
      </div>

      {/* Plant */}
      <motion.div
        className="plant-decoration"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <div className="plant-pot-wrapper">
          <div className="plant-leaves">
            <div className="leaf"></div>
            <div className="leaf"></div>
            <div className="leaf"></div>
          </div>
          <div className="plant-pot"></div>
        </div>
      </motion.div>

      {/* Books */}
      <motion.div
        className="books-decoration"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <div className="book book-3">
          <span>OPERATING SYSTEMS</span>
        </div>
        <div className="book book-2">
          <span>DATA STRUCTURES</span>
        </div>
        <div className="book book-1">
          <span>ALGORITHMS</span>
        </div>
      </motion.div>

      {/* Coffee Mug */}
      <motion.div
        className="coffee-decoration"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="mug">
          <div className="mug-handle"></div>
          <div className="mug-code">&lt;/&gt;</div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentIllustration;
