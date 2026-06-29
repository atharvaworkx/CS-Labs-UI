import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaGithub, 
  FaMicrosoft,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';
import '../styles/Login.css';
import Toast from './Toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState(null);
  const cardRef = useRef(null);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Card tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setToast({ type: 'success', message: 'Login Successful!' });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setToast({ type: 'info', message: `Connecting to ${provider}...` });
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-overlay"></div>
        
        {/* Floating Blurred Circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="floating-circle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Moving Gradient Lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="gradient-line"
            style={{
              top: `${i * 25}%`,
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Cursor Glow Effect */}
      <motion.div
        className="cursor-glow"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Main Login Card */}
      <motion.div
        ref={cardRef}
        className="login-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animated Border */}
        <div className="card-border-animation"></div>

        {/* Header Section */}
        <motion.div
          className="login-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h1
            className="login-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Welcome Back
          </motion.h1>
          <motion.p
            className="login-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Continue your learning journey.
          </motion.p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Field */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className={`input-wrapper ${focusedField === 'username' ? 'focused' : ''} ${errors.username ? 'error' : ''} ${formData.username && !errors.username ? 'valid' : ''}`}>
              <FaUser className="input-icon" />
              <div className="input-content">
                <label className={formData.username ? 'active' : ''}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {formData.username && !errors.username && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="valid-icon"
                >
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.username && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.username}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className={`input-wrapper ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''} ${formData.email && !errors.email ? 'valid' : ''}`}>
              <FaEnvelope className="input-icon" />
              <div className="input-content">
                <label className={formData.email ? 'active' : ''}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {formData.email && !errors.email && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="valid-icon"
                >
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div className={`input-wrapper ${focusedField === 'password' ? 'focused' : ''} ${errors.password ? 'error' : ''} ${formData.password && !errors.password ? 'valid' : ''}`}>
              <FaLock className="input-icon" />
              <div className="input-content">
                <label className={formData.password ? 'active' : ''}>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.password}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Forgot Password */}
          <motion.div
            className="forgot-password-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <motion.button
              type="button"
              className="forgot-password"
              whileHover={{ x: 5 }}
              onClick={() => setToast({ type: 'info', message: 'Password reset link sent to your email!' })}
            >
              Forgot Password?
            </motion.button>
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            className="login-button"
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="button-content">
              {isLoading ? (
                <>
                  <motion.div
                    className="spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  Login
                  <motion.div
                    className="button-arrow"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </>
              )}
            </span>
            <span className="button-ripple"></span>
          </motion.button>

          {/* Divider */}
          <motion.div
            className="divider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </motion.div>

          {/* Social Login */}
          <motion.div
            className="social-login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <motion.button
              type="button"
              className="social-button google"
              onClick={() => handleSocialLogin('Google')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0 }}
            >
              <FaGoogle />
              <span>Google</span>
            </motion.button>

            <motion.button
              type="button"
              className="social-button github"
              onClick={() => handleSocialLogin('GitHub')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.1 }}
            >
              <FaGithub />
              <span>GitHub</span>
            </motion.button>

            <motion.button
              type="button"
              className="social-button microsoft"
              onClick={() => handleSocialLogin('Microsoft')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.2 }}
            >
              <FaMicrosoft />
              <span>Microsoft</span>
            </motion.button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            className="signup-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span>Don't have an account?</span>
            <motion.button
              type="button"
              onClick={() => navigate('/signup')}
              whileHover={{ x: 5 }}
              className="signup-button"
            >
              Sign Up
              <motion.span
                className="arrow-icon"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight />
              </motion.span>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
