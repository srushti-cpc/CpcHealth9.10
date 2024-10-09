import React, { useState } from 'react';
import axios from 'axios';
import '../style/auth.css';

const Auth = () => {
  const [formType, setFormType] = useState('signin');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    birthdate: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInClick = () => {
    setFormType('signin');
    document.querySelector('.auth-container').classList.remove('right-panel-active');
  };

  const handleSignUpClick = () => {
    setFormType('signup');
    document.querySelector('.auth-container').classList.add('right-panel-active');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (formType === 'signin') {
        response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
      } else if (formType === 'signup') {
        response = await axios.post('http://localhost:5000/api/users/register', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          birthdate: formData.birthdate
        });
      }

      if (response && response.data) {
        alert(response.data.message || 'Operation successful');
      } else {
        alert('Unexpected response structure');
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'An error occurred');
      } else {
        alert('Error without response: ' + err.message);
      }
    }
  };

  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        {/* Sign Up */}
        <div className={`auth-container__form auth-container--signup ${formType === 'signup' ? 'active' : ''}`}>
          <form action="#" className="auth-form" id="form1" onSubmit={handleSubmit}>
            <h2 className="form__title">Sign Up</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="auth-input"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="auth-input"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="auth-input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              className="auth-input"
              value={formData.birthdate}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="auth-input"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="auth-input"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button className="auth-btn">Sign Up</button>
          </form>
        </div>

        {/* Sign In */}
        <div className={`auth-container__form auth-container--signin ${formType === 'signin' ? 'active' : ''}`}>
          <form action="#" className="auth-form" id="form2" onSubmit={handleSubmit}>
            <h2 className="form__title">Login In</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="auth-input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              value={formData.password}
              onChange={handleInputChange}
            />
            <a href="#" className="link">Forgot your password?</a>
            <button className="auth-btn">Login In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="auth-container__overlay">
          <div className="auth-overlay">
            <div className="auth-overlay__panel auth-overlay--left">
              <button className="auth-btn" id="signIn" onClick={handleSignInClick}>Login In</button>
            </div>
            <div className="auth-overlay__panel auth-overlay--right">
              <button className="auth-btn" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
