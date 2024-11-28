import React from 'react'
import './Footer.css'
import logo from '../../Assets/slt_logo.png';

function Footer() {
  return (
    <footer className="footer_f"> {/* Use the 'footer' class */}
      <div className="footer-content_f">
        <div className="footer-logo_f">
          {/* Replace this with your logo image */}
          <img src={logo} alt="Company Logo" />
        </div>
        
        <div className="footer-services_f">
          {/* Section for Service Domain */}
          <div className="service-section_f">
            <h3>Service</h3>
            <ul>
              <li>Domain</li>
              <li>Shared Hosting</li>
              <li>Cloud Hosting</li>
              <li>Private Hosting</li>
            </ul>
          </div>

          {/* Section for Hosting */}
          <div className="service-section_f">
            <h3>Hosting</h3>
            <ul>
              <li>Cheap Hosting</li>
              <li>Hosting Wordpress</li>
              <li>Email Hosting</li>
              <li>Hosting Unlimited</li>
            </ul>
          </div>
          {/* Section for Hosting */}
          <div className="service-section_f">
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Career</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Section for Hosting */}
          <div className="service-section_f">
            <h3>Help</h3>
            <ul>
              <li>FAQ</li>
              <li>Help Support</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
