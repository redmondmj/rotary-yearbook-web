import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <img src={logo} alt="Rotary Club of Truro Logo" style={{ height: '40px', width: 'auto', alignSelf: 'flex-start', display: 'block' }} />
          <p>
            Supporting local service projects, youth initiatives, and accessibility enhancements in our community since 1926.
          </p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/yearbooks">Yearbook Archives</Link></li>
            <li><Link to="/sponsors">Sponsors Directory</Link></li>
            <li><Link to="/contact">Get in Touch</Link></li>
            <li><a href="https://rotarycluboftruro.ca/" target="_blank" rel="noopener noreferrer">Rotary Club of Truro</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Info</h4>
          <p>Email: info@rotaryyearbook.ca</p>
          <p>Website: www.rotaryyearbook.ca</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <a href="https://rotarycluboftruro.ca/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Rotary Club of Truro</a>. All rights reserved.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Shield size={14} /> Local Community Support Project
        </p>
      </div>
    </footer>
  );
}
