import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Menu, X, Award } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="nav-brand">
          <BookOpen className="icon" size={24} style={{ color: 'var(--color-accent)' }} />
          <span>Rotary</span>Yearbook
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
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
}
