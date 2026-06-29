import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [focusedField, setFocusedField] = useState(null);

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
    setTimeout(() => {
      setIsLoading(false);
      setToast({ type: 'success', message: 'Login Successful!' });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 800);
  };

  const handleSocialLogin = (provider) => {
    setToast({ type: 'info', message: `Connecting to ${provider}...` });
  };

  return (
    <div className="login-container">
      <div className="animated-background">
        <div className="gradient-overlay"></div>
      </div>

      <div className="login-card">
        <div className="card-border-animation"></div>

        <div className="login-header">
          <h1 className="login-title">
            Welcome Back
          </h1>
          <p className="login-subtitle">
            Continue your learning journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
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
                <span className="valid-icon">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="input-group">
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
                <span className="valid-icon">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
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
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="forgot-password-wrapper">
            <button
              type="button"
              className="forgot-password"
              onClick={() => setToast({ type: 'info', message: 'Password reset link sent to your email!' })}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            <span className="button-content">
              {isLoading ? 'Processing...' : 'Login'}
            </span>
          </button>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-login">
            <button
              type="button"
              className="social-button google"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="social-button github"
              onClick={() => handleSocialLogin('GitHub')}
            >
              <FaGithub />
              <span>GitHub</span>
            </button>

            <button
              type="button"
              className="social-button microsoft"
              onClick={() => handleSocialLogin('Microsoft')}
            >
              <FaMicrosoft />
              <span>Microsoft</span>
            </button>
          </div>

          <div className="signup-link">
            <span>Don't have an account?</span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="signup-button"
            >
              Sign Up
              <FaArrowRight className="arrow-icon" />
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Login;
