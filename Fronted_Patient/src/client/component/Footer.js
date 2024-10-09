import React from 'react';
import '../style/footer.css'; // Ensure the correct CSS file is imported

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid grid--footer">
        <div className="logo-col">
          <a href="#" className="footer-logo">
            <img className="logo" alt="Omnifood logo" src="/cpclogo.jpeg"  />
          </a>

          <ul className="social-links">
            <li>
              <a className="footer-link" href="#">
                <ion-icon className="social-icon" name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <ion-icon className="social-icon" name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <ion-icon className="social-icon" name="logo-twitter"></ion-icon>
              </a>
            </li>
          </ul>

          {/* <p className="copyright">
            Made with ❤️ by METTA SURENDHAR
          </p> */}
        </div>

        <div className="address-col">
          <p className="footer-heading">Contact us</p>
          <address className="contacts">
            <p className="address">
            7517 S. McClintock Drive, Tempe, AZ 85281
            </p>
            <p>
              <a className="footer-link" href="tel:415-201-6370">952-657-3338</a><br />
              <a className="footer-link" href="mailto:hello@omnifood.com">info@cleanplateclubs.com</a>
            </p>
          </address>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Explore</p>
          <ul className="footer-nav">
            <li><a className="footer-link" href="#">Home</a></li>
            <li><a className="footer-link" href="#">About Us</a></li>
            <li><a className="footer-link" href="#">Solutions</a></li>
            <li><a className="footer-link" href="#">Contact us</a></li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Contact Links</p>
          <ul className="footer-nav">
            <li><a className="footer-link" href="#">Write for us</a></li>
            <li><a className="footer-link" href="#">Book maceo</a></li>
            <li><a className="footer-link" href="#"></a></li>
            {/* <li><a className="footer-link" href="#">Careers</a></li> */}
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">​​what we do</p>
          <ul className="footer-nav">
            <li><a className="footer-link" href="#">We use AI to help communities and companies operate more efficiently by “reinventing” how they analyze and use data to unlock insights.</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
