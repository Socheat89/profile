import React, { useState, useEffect } from 'react';
import { useData } from '../context/dataContext';
import { Shield, Home, Menu, X, Code } from 'lucide-react';

const Navbar = ({ currentView, setView }) => {
  const { settings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ទំព័រដើម', id: 'hero' },
    { label: 'សេវាកម្ម', id: 'services' },
    { label: 'សមាជិកក្រុម', id: 'team' },
    { label: 'ស្នាដៃ/គម្រោង', id: 'projects' },
    { label: 'ទំនាក់ទំនង', id: 'contact' }
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);
    if (currentView !== 'landing') {
      setView('landing');
      // Delay scrolling slightly to allow rendering
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navStyles = scrolled 
    ? { backgroundColor: 'rgba(10, 10, 15, 0.85)', padding: '0.75rem 2rem' } 
    : {};

  return (
    <nav className="navbar" style={navStyles}>
      <div className="logo" style={{ cursor: 'pointer' }} onClick={() => handleNavClick('hero')}>
        <Code size={24} className="accent-secondary" />
        <span>{settings.logoText || 'DevCambodia'}</span>
      </div>

      {currentView === 'landing' ? (
        <>
          {/* Desktop Nav Links */}
          <ul className="nav-links" style={{ display: window.innerWidth <= 768 ? 'none' : 'flex' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <span className="nav-link" onClick={() => handleNavClick(item.id)}>
                  {item.label}
                </span>
              </li>
            ))}
            <li>
              <button className="btn btn-secondary" onClick={() => setView('admin')} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <Shield size={16} />
                <span>Admin Panel</span>
              </button>
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <div 
            style={{ display: window.innerWidth > 768 ? 'none' : 'block', cursor: 'pointer', color: 'var(--text-primary)' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div 
              className="glass-panel animate-fade-in"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '0.5rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                zIndex: 99
              }}
            >
              {navItems.map((item) => (
                <span 
                  key={item.id} 
                  className="nav-link" 
                  onClick={() => handleNavClick(item.id)}
                  style={{ display: 'block', fontSize: '1.1rem' }}
                >
                  {item.label}
                </span>
              ))}
              <button 
                className="btn btn-primary" 
                onClick={() => { setIsOpen(false); setView('admin'); }}
                style={{ width: '100%' }}
              >
                <Shield size={16} />
                <span>Admin Panel</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <button className="btn btn-secondary" onClick={() => setView('landing')}>
          <Home size={16} />
          <span>ត្រឡប់ទៅកាន់ Website</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
