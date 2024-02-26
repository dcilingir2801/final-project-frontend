import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__section">
        <h3>Support</h3>
        <ul>
          <li>Help Centre</li>
          <li>AirCover</li>
          <li>Anti-discrimination</li>
          <li>Disability support</li>
          <li>Cancellation options</li>
          <li>Report neighbourhood concern</li>
        </ul>
      </div>
      <div className="footer__section">
        <h3>Hosting</h3>
        <ul>
          <li>Airbnb your home</li>
          <li>AirCover for Hosts</li>
          <li>Hosting resources</li>
          <li>Community forum</li>
          <li>Hosting responsibly</li>
          <li>Join a free Hosting class</li>
        </ul>
      </div>
      <div className="footer__section">
        <h3>Airbnb</h3>
        <ul>
          <li>Newsroom</li>
          <li>New features</li>
          <li>Careers</li>
          <li>Investors</li>
          <li>Gift cards</li>
          <li>Airbnb.org emergency stays</li>
        </ul>
      </div>
      <hr className="footer__hr" />
      <div className="footer__additional">
        <div className="footer__additional--left">
          <span>© 2024 Airbnb, Inc.</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sitemap</span>
          <span>UK Modern Slavery Act</span>
          <span>Company details</span>
        </div>
        <div className="footer__additional--right">
          <span>English (GB)</span>
          <span>Choose a currency</span>
          <span>£ GBP</span>
          <span><img src="/src/assets/facebook_logo.png" alt="Facebook Logo"/></span>
          <span><img src="/src/assets/twitter_logo.png"alt="Twitter Logo"/></span>
          <span><img src="/src/assets/instagram_logo.png" alt="Instagram Logo"/></span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
