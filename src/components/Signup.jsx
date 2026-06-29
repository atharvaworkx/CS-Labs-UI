import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
      }, 1000);
    }, 800);
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
      <div className="animated-background">
        <div className="gradient-overlay"></div>
      </div>

      <div className="signup-card">
        <div className="card-border-animation"></div>

        <div className="signup-header">
          <div className="header-icon">
            <FaGraduationCap />
          </div>
          <h1 className="signup-title">
            Create Your Learning Account
          </h1>
          <p className="signup-subtitle">
            Start your educational journey today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
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
                <span className="valid-icon">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
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
                <span className="valid-icon">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="input-group">
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
                <span className="valid-icon">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            {errors.academicYear && <span className="error-message">{errors.academicYear}</span>}
          </div>

          <div className="input-group">
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
                <span className="valid-icon">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            {errors.branch && <span className="error-message">{errors.branch}</span>}
          </div>

          <div className="input-group">
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
                <span className="valid-icon">
                  <FaCheckCircle />
                </span>
              )}
            </div>
            {errors.college && <span className="error-message">{errors.college}</span>}
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
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(passwordStrength / 3) * 100}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    }}
                  />
                </div>
                <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                  {getPasswordStrengthText()}
                </span>
              </div>
            )}
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="input-group">
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
                <span
                  className={`match-icon ${errors.confirmPassword ? 'no-match' : 'match'}`}
                >
                  {errors.confirmPassword ? <FaTimes /> : <FaCheck />}
                </span>
              )}
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span
                className={`custom-checkbox ${formData.agreeToTerms ? 'checked' : ''}`}
              >
                {formData.agreeToTerms && (
                  <FaCheck />
                )}
              </span>
              <span className="checkbox-text">
                I agree to <button type="button" className="terms-link">Terms & Conditions</button>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={isLoading}
          >
            <span className="button-content">
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </span>
          </button>

          <div className="login-link">
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="login-button-link"
            >
              Login
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

export default Signup;
