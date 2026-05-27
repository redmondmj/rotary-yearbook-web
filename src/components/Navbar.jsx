import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
          <img src={logo} alt="Rotary Club of Truro Logo" style={{ height: '44px', width: 'auto', display: 'block' }} />
        </NavLink>

        {/* Desktop Menu */}
        <div className="nav-links" style={{ display: 'flex' }}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/yearbooks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Yearbooks
          </NavLink>
          <NavLink to="/sponsors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Sponsors
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
          <a 
            href="https://rotarycluboftruro.ca/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link"
          >
            Club Site
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
}
