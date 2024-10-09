import React from 'react';
import '../style/vision.css'; // Import CSS for the Header
import heroImg from '../assets/hero-min.png'; // Import the image from assets
import heroImgWebp from '../assets/hero.webp'; // Import the WebP image from assets

const Vision = () => {
  return (
    <section className="section-hero">
    <div className="hero">
      <div className="hero-text-box">
        <h1 className="heading-primary">
       Building Community Based Solutions For EveryDay Life 
        </h1>
        <p className="hero-description">
       Empowering communities with seamless POS Solutions,Comprehensive Provider Directories and Donor and Funding Networks
        </p>
        {/* <a href="#cta" className="btn btn--full margin-right-sm">
          Book demo
        </a> */}
        <a href="#how" className="btn btn--full margin-right-sm">
          Learn more &darr;
        </a>
        {/* <div className="delivered-meals">
          <div className="delivered-imgs">
            <img src="/img/customers/customer-1.jpg" alt="Customer photo" />
            <img src="/img/customers/customer-2.jpg" alt="Customer photo" />
            <img src="/img/customers/customer-3.jpg" alt="Customer photo" />
            <img src="/img/customers/customer-4.jpg" alt="Customer photo" />
            <img src="/img/customers/customer-5.jpg" alt="Customer photo" />
            <img src="/img/customers/customer-6.jpg" alt="Customer photo" />
          </div>
          <p className="delivered-text">
            <span>250,000+</span> meals delivered last year!
          </p>
        </div> */}
      </div>
      <div className="hero-img-box">
         <picture>
            <source srcSet={heroImgWebp} type="image/webp" />
            <source srcSet={heroImg} type="image/png" />
            <img
              src={heroImg}
              className="hero-img"
              alt="Woman enjoying food, meals in storage container, and food bowls on a table"
            />
          </picture>
      </div>
    </div>
  </section>
  );
};

export default Vision;
