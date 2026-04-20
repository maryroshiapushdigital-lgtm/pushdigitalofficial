'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open to prevent
  // scrollbar disappearance from shifting the viewport width
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const menuItems = [
    { label: 'Home', key: 'home' },
    { label: 'About', key: 'about' },
    { label: 'Capabilities', key: 'capabilities' },
    { label: 'Infrastructure', key: 'infrastructure' },
    { label: 'Process', key: 'process' },
    { label: 'Applications', key: 'applications' },
    { label: 'Benefits', key: 'benefits' },
    { label: 'Contact', key: 'contact' },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Single scroll handler for ALL nav interactions (desktop, mobile, logo, CTA).
  // Closes the mobile menu first, waits for the exit animation, then scrolls.
  const handleNavClick = (e, key) => {
    e.preventDefault();
    setIsOpen(false);

    setTimeout(() => {
      const section = document.getElementById(key);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <>
      <motion.nav
        className="navbar"
      >
        <div className="navbar-container">
          {/* Logo */}
          <motion.div
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
            onClick={(e) => handleNavClick(e, 'home')}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src="/logo-img.png"
              alt="Push Digital"
              width={187}
              height={35}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.key}
                className="navbar-link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={(e) => handleNavClick(e, item.key)}
              >
                {item.label}
                <span className="navbar-underline"></span>
              </motion.a>
            ))}
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            <motion.button
              className="navbar-cta"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Book a Consultation
            </motion.button>

            {/* Hamburger */}
            <motion.button
              className="hamburger"
              onClick={toggleMenu}
            >
              {/* FIX: display:block prevents inline gap that causes position shift on icon swap */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ display: 'block' }}
              >
                {isOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu (outside nav to escape stacking context) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={`#${item.key}`}
                className="mobile-menu-item"
                onClick={(e) => handleNavClick(e, item.key)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 + index * 0.04, ease: 'easeOut' }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.button
              className="mobile-cta"
              onClick={(e) => handleNavClick(e, 'contact')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 + menuItems.length * 0.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Consultation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}