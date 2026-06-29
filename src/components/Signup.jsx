import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaPhone,
  FaUniversity,
  FaBook,
  FaGraduationCap,
  FaCheckCircle,
  FaTimes,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';
import '../styles/Signup.css';
import Toast from './Toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    academicYear: '',
    branch: '',
    college: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const cardRef = useRef(null);

  const academicYears = [
    'First Year',
    'Second Year',
    'Third Year',
    'Final Year',
    'Graduate',
    'Post Graduate'
  ];

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+61', country: 'AU' },
    { code: '+86', country: 'CN' }
  ];

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
      const rotateX = (y - centerY) / 40;
      const rotateY = (centerX - x) / 40;

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

  // Password strength calculator
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    setPasswordStrength(Math.min(strength, 3));
  }, [formData.password]);

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.length < 3 ? 'Name must be at least 3 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'phone':
        return !/^\d{10}$/.test(value) ? 'Phone number must be 10 digits' : '';
      case 'academicYear':
        return !value ? 'Please select your academic year' : '';
      case 'branch':
        return value.length < 2 ? 'Please enter your branch/course' : '';
      case 'college':
        return value.length < 3 ? 'Please enter your college name' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    if (name !== 'agreeToTerms') {
      const error = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: value }));
    const error = validateField('phone', value);
    setErrors(prev => ({ ...prev, phone: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      setToast({ type: 'error', message: 'Please agree to Terms & Conditions' });
      return;
    }

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'agreeToTerms' && key !== 'countryCode') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setToast({ type: 'success', message: 'Account Created Successfully!' });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 1: return 'Weak';
      case 2: return 'Medium';
      case 3: return 'Strong';
      default: return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return '#ff4444';
      case 2: return '#ffaa00';
      case 3: return '#00C851';
      default: return '#ddd';
    }
  };

  return (
    <div className="signup-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-overlay"></div>
        
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

        {[...Array(20)].map((_, i) => (
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

        {/* Floating Educational Icons */}
        <motion.div
          className="floating-icon graduation-cap"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <FaGraduationCap />
        </motion.div>

        <motion.div
          className="floating-icon book-icon"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <FaBook />
        </motion.div>
      </div>

      <motion.div
        className="cursor-glow"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      <motion.div
        ref={cardRef}
        className="signup-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="card-border-animation"></div>

        <motion.div
          className="signup-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="header-icon"
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
          <motion.h1
            className="signup-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Create Your Learning Account
          </motion.h1>
          <motion.p
            className="signup-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Start your educational journey today.
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Full Name */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className={`input-wrapper ${focusedField === 'fullName' ? 'focused' : ''} ${errors.fullName ? 'error' : ''} ${formData.fullName && !errors.fullName ? 'valid' : ''}`}>
              <FaUser className="input-icon" />
              <div className="input-content">
                <label className={formData.fullName ? 'active' : ''}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {formData.fullName && !errors.fullName && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="valid-icon">
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.fullName && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.fullName}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email */}
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
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="valid-icon">
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Phone Number */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div className={`input-wrapper phone-wrapper ${focusedField === 'phone' ? 'focused' : ''} ${errors.phone ? 'error' : ''} ${formData.phone && !errors.phone ? 'valid' : ''}`}>
              <FaPhone className="input-icon" />
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="country-code-select"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} {country}
                  </option>
                ))}
              </select>
              <div className="input-content">
                <label className={formData.phone ? 'active' : ''}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  maxLength="10"
                />
              </div>
              {formData.phone && !errors.phone && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="valid-icon">
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.phone}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Academic Year */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <div className={`input-wrapper select-wrapper ${focusedField === 'academicYear' ? 'focused' : ''} ${errors.academicYear ? 'error' : ''} ${formData.academicYear && !errors.academicYear ? 'valid' : ''}`}>
              <FaGraduationCap className="input-icon" />
              <div className="input-content">
                <label className={formData.academicYear ? 'active' : ''}>Academic Year</label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('academicYear')}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value=""></option>
                  {academicYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {formData.academicYear && !errors.academicYear && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="valid-icon">
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.academicYear && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.academicYear}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Branch/Course */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className={`input-wrapper ${focusedField === 'branch' ? 'focused' : ''} ${errors.branch ? 'error' : ''} ${formData.branch && !errors.branch ? 'valid' : ''}`}>
              <FaBook className="input-icon" />
              <div className="input-content">
                <label className={formData.branch ? 'active' : ''}>Branch / Course</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('branch')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {formData.branch && !errors.branch && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="valid-icon">
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.branch && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.branch}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* College Name */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <div className={`input-wrapper ${focusedField === 'college' ? 'focused' : ''} ${errors.college ? 'error' : ''} ${formData.college && !errors.college ? 'valid' : ''}`}>
              <FaUniversity className="input-icon" />
              <div className="input-content">
                <label className={formData.college ? 'active' : ''}>College Name</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('college')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {formData.college && !errors.college && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="valid-icon">
                  <FaCheckCircle />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.college && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.college}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
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
            {formData.password && (
              <motion.div
                className="password-strength"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <div className="strength-bar">
                  <motion.div
                    className="strength-fill"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(passwordStrength / 3) * 100}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                  {getPasswordStrengthText()}
                </span>
              </motion.div>
            )}
            <AnimatePresence>
              {errors.password && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.password}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className={`input-wrapper ${focusedField === 'confirmPassword' ? 'focused' : ''} ${errors.confirmPassword ? 'error' : ''} ${formData.confirmPassword && !errors.confirmPassword ? 'valid' : ''}`}>
              <FaLock className="input-icon" />
              <div className="input-content">
                <label className={formData.confirmPassword ? 'active' : ''}>Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formData.confirmPassword && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`match-icon ${errors.confirmPassword ? 'no-match' : 'match'}`}
                >
                  {errors.confirmPassword ? <FaTimes /> : <FaCheck />}
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.span className="error-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {errors.confirmPassword}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Terms & Conditions */}
          <motion.div
            className="checkbox-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <motion.span
                className="custom-checkbox"
                animate={{
                  backgroundColor: formData.agreeToTerms ? 'var(--primary-maroon)' : 'transparent',
                  borderColor: formData.agreeToTerms ? 'var(--primary-maroon)' : 'var(--border-light)',
                }}
              >
                {formData.agreeToTerms && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <FaCheck />
                  </motion.div>
                )}
              </motion.span>
              <span className="checkbox-text">
                I agree to <button type="button" className="terms-link">Terms & Conditions</button>
              </span>
            </label>
          </motion.div>

          {/* Sign Up Button */}
          <motion.button
            type="submit"
            className="signup-button"
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
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
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up
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

          {/* Login Link */}
          <motion.div
            className="login-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <span>Already have an account?</span>
            <motion.button
              type="button"
              onClick={() => navigate('/login')}
              whileHover={{ x: 5 }}
              className="login-button-link"
            >
              Login
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

export default Signup;
