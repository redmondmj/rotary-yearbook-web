import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3><span>Rotary</span> Yearbook</h3>
          <p>
            Supporting local service projects, youth initiatives, and accessibility enhancements in our community since 1953.
          </p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/yearbooks">Yearbook Archives</Link></li>
            <li><Link to="/sponsors">Sponsors Directory</Link></li>
            <li><Link to="/contact">Get in Touch</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Info</h4>
          <p>Email: info@rotaryyearbook.ca</p>
          <p>Website: www.rotaryyearbook.ca</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Rotary Club. All rights reserved.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Shield size={14} /> Local Community Support Project
        </p>
      </div>
    </footer>
  );
}
