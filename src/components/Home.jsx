import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaBook, FaChartLine, FaArrowRight, FaDatabase, FaCode, 
  FaProjectDiagram, FaNetworkWired, FaServer, FaBrain, FaMicrochip,
  FaClipboardList, FaFileAlt, FaCertificate, FaRocket, FaTrophy,
  FaChartLine as FaChart, FaCheckCircle, FaRobot, FaQuestionCircle,
  FaUpload, FaEdit
} from 'react-icons/fa';
import StudentIllustration from './StudentIllustration';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const subjects = [
    { icon: FaProjectDiagram, name: 'Data Structures', questions: '1200+ Qs' },
    { icon: FaCode, name: 'Algorithms', questions: '1600+ Qs' },
    { icon: FaNetworkWired, name: 'Discrete Mathematics', questions: '1000+ Qs' },
    { icon: FaNetworkWired, name: 'Computer Networks', questions: '1100+ Qs' },
    { icon: FaServer, name: 'Operating Systems', questions: '1100+ Qs' },
    { icon: FaDatabase, name: 'DBMS', questions: '900+ Qs' },
    { icon: FaBrain, name: 'Theory of Computation', questions: '1000+ Qs' },
    { icon: FaMicrochip, name: 'Digital Logic', questions: '800+ Qs' }
  ];

  const statsCards = [
    { value: '1,248', label: 'Questions Solved', subtext: '82% this week', growth: '+8%' },
    { value: '78%', label: 'Accuracy', subtext: '↑ 6% this week', growth: '+6%' },
    { value: '612 / 1000', label: 'Mock Test Score', subtext: '↑ 10% this week', growth: '+10%' },
    { value: 'Top 18%', label: 'Rank Predictor', subtext: '↑ 5% this week', growth: '+5%' }
  ];

  const practiceItems = [
    { icon: FaClipboardList, title: 'Question Bank', desc: '31,000+ curated questions', action: 'Start Practicing' },
    { icon: FaFileAlt, title: 'Mock Tests', desc: 'Full length GATE mock tests', action: 'Start Mock' },
    { icon: FaCertificate, title: 'Topic Tests', desc: 'Test your understanding chapterwise', action: 'Attempt Test' },
    { icon: FaBook, title: 'Previous Year Papers', desc: 'Download & practice past year papers', action: 'View Papers' },
    { icon: FaChart, title: 'Performance', desc: 'Track your progress and improve', action: 'View Analysis' }
  ];

  const testimonials = [
    { name: 'Anirudh Sharma', exam: 'GATE 2024 AIR 152', text: 'CS LABS has the best organized content. The question bank and doubt solver are simply amazing!' },
    { name: 'Priya Singh', exam: 'GATE 2024 AIR 298', text: 'The explanations are so detailed that even the toughest topics become easy to understand.' },
    { name: 'Karthik Reddy', exam: 'GATE 2024 AIR 431', text: 'Mock tests here are just like the real exam. Highly recommended for all GATE CS aspirants!' }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-section hero-section">
        <motion.div
          className="hero-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              🎓 #1 Platform for GATE CS Aspirants
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Master GATE<br />
              <span className="gradient-text">Computer Science</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Comprehensive content, practice questions, mock tests and expert doubt support to help you crack GATE CS.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="primary-button"
                onClick={() => navigate('/courses')}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Explore CS Courses
                <FaArrowRight />
              </motion.button>

              <motion.button
                className="secondary-button"
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Doubt Solver
              </motion.button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="stat-item">
                <FaUsers />
                <div>
                  <strong>10K+</strong>
                  <span>Active Learners</span>
                </div>
              </div>
              <div className="stat-item">
                <FaBook />
                <div>
                  <strong>25K+</strong>
                  <span>Questions</span>
                </div>
              </div>
              <div className="stat-item">
                <FaChartLine />
                <div>
                  <strong>500+</strong>
                  <span>Topics</span>
                </div>
              </div>
            </motion.div>
          </div>

          <StudentIllustration />
        </motion.div>
      </section>

      {/* Subjects Section */}
      <section className="home-section subjects-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Computer Science & Engineering</h2>
            <p className="section-subtitle">All essential subjects covered for GATE CS</p>
          </motion.div>

          <div className="subjects-grid">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="subject-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 15px 40px rgba(106, 13, 37, 0.15)' }}
              >
                <div className="subject-icon">
                  <subject.icon />
                </div>
                <h3 className="subject-name">{subject.name}</h3>
                <p className="subject-questions">{subject.questions}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Dashboard Section */}
      <section className="home-section stats-dashboard-section">
        <div className="section-container">
          <div className="stats-dashboard-grid">
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="dashboard-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="dashboard-icon">
                  <FaTrophy />
                </div>
                <div className="dashboard-value">{stat.value}</div>
                <div className="dashboard-label">{stat.label}</div>
                <div className="dashboard-subtext">
                  {stat.subtext}
                  <span className="growth-badge">{stat.growth}</span>
                </div>
                <svg className="mini-chart" viewBox="0 0 100 30">
                  <polyline
                    points="0,25 20,22 40,18 60,20 80,12 100,8"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="home-section practice-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Practice & Improve</h2>
            <p className="section-subtitle">Everything you need to ace GATE CS</p>
          </motion.div>

          <div className="practice-grid">
            {practiceItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="practice-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 15px 40px rgba(106, 13, 37, 0.15)' }}
              >
                <div className="practice-icon">
                  <item.icon />
                </div>
                <h3 className="practice-title">{item.title}</h3>
                <p className="practice-desc">{item.desc}</p>
                <motion.button
                  className="practice-button"
                  whileHover={{ x: 5 }}
                >
                  {item.action} <FaArrowRight />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doubt Solver Section */}
      <section className="home-section doubt-solver-section">
        <div className="section-container">
          <motion.div
            className="doubt-solver-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="doubt-left">
              <h2 className="section-title">Doubt Solver – Get Instant Answers</h2>
              <p className="section-subtitle">Ask your doubt and get step-by-step solutions from our experts & AI.</p>
              
              <div className="doubt-input-area">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="doubt-input"
                />
                <div className="doubt-actions">
                  <button className="doubt-action-btn">
                    <FaQuestionCircle /> Ask Question
                  </button>
                  <button className="doubt-action-btn secondary">
                    <FaUpload /> Upload Image / PDF
                  </button>
                  <button className="doubt-action-btn secondary">
                    <FaEdit /> From Link
                  </button>
                </div>
                <div className="subject-selector">
                  <select className="subject-select">
                    <option>Select Subject</option>
                    <option>Data Structures</option>
                    <option>Algorithms</option>
                    <option>Operating Systems</option>
                  </select>
                  <select className="topic-select">
                    <option>Select Topic (Optional)</option>
                  </select>
                  <button className="get-answer-btn">
                    Get Answer <FaRocket />
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              className="doubt-right"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="robot-illustration">
                <FaRobot className="robot-icon" />
                <div className="help-badges">
                  <div className="help-badge">?</div>
                  <div className="help-badge exclaim">!</div>
                </div>
              </div>
              <p className="ai-text">Our AI + Expert community<br />is here to help you 24/7</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home-section testimonials-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What Our Learners Say</h2>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="author-name">– {testimonial.name}</div>
                    <div className="author-exam">{testimonial.exam}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-section cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Start Your GATE Preparation Journey with CSLABS Today!</h2>
          <p className="cta-subtitle">Learn. Practice. Analyze. Achieve Excellence.</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(212, 175, 55, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
          >
            Get Started Now <FaArrowRight />
          </motion.button>
          <div className="cta-decoration">
            <FaRocket className="rocket-icon" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
