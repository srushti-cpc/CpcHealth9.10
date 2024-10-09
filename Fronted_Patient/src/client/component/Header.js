import React from 'react';
import '../style/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <a href="#home">
        <img className="logo" alt="cpc logo" src="/cpclogo.jpeg" />
      </a>

      <nav className="main-nav">
        <ul className="main-nav-list">
          <li><a className="main-nav-link" href="#how">Home</a></li>
          <li><a className="main-nav-link" href="#meals">Solutions</a></li>
          <li><a className="main-nav-link" href="#testimonials">About Us</a></li>
          <li><a className="main-nav-link" href="#pricing">Press</a></li>
          <li><Link className="main-nav-link nav-cta" to="/signup">Signup</Link></li>
        </ul>
      </nav>

      <button className="btn-mobile-nav">
        <ion-icon className="icon-mobile-nav" name="menu-outline"></ion-icon>
        <ion-icon className="icon-mobile-nav" name="close-outline"></ion-icon>
      </button>
    </header>
  );
};

export default Header;
