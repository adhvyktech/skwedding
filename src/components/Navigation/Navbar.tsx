import React, { useState, useEffect } from 'react';
import { Monogram } from '../Monogram/Monogram';
import { Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Celebrations', target: 'celebrations' },
    { label: 'Events', target: 'events' },
    { label: 'Family', target: 'family' },
    { label: 'Gallery', target: 'gallery' },
    { label: 'Venues', target: 'venue' },
    { label: 'Wishes', target: 'wishes' },
  ];

  const handleLinkClick = (target: string) => {
    onNavClick(target);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(59, 13, 24, 0.94)' : 'rgba(42, 8, 17, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid rgba(201, 164, 92, 0.35)' : '1px solid rgba(201, 164, 92, 0.12)',
        padding: isScrolled ? '10px 24px' : '18px 24px',
        boxShadow: isScrolled ? '0 10px 30px rgba(26, 5, 10, 0.5)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Royal S+K Monogram & Names */}
        <button
          onClick={() => handleLinkClick('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          aria-label="Scroll to Top"
        >
          <Monogram size={42} variant="gold" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: '0.95rem',
                letterSpacing: '0.15em',
                color: '#FFFDF9',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              SARVESH & KEERTHANA
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
              }}
            >
              13 SEPTEMBER 2026
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '26px',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleLinkClick(link.target)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: 'var(--text-secondary-on-dark)',
                cursor: 'pointer',
                padding: '6px 0',
                position: 'relative',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-bright)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary-on-dark)')}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: RSVP Button & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => handleLinkClick('rsvp')}
            className="btn-primary"
            style={{
              height: '42px',
              minHeight: '42px',
              padding: '0 20px',
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
            }}
          >
            <Heart size={14} fill="#2A0811" />
            <span>RSVP</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center"
            style={{
              background: 'rgba(201, 164, 92, 0.15)',
              border: '1px solid rgba(201, 164, 92, 0.4)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: 'var(--color-gold-light)',
              cursor: 'pointer',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(42, 8, 17, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(201, 164, 92, 0.35)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleLinkClick(link.target)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                padding: '10px 0',
                fontFamily: 'var(--font-serif-display)',
                fontSize: '1.25rem',
                color: '#FFFDF9',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(201, 164, 92, 0.15)',
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleLinkClick('rsvp')}
            className="btn-primary"
            style={{
              width: '100%',
              marginTop: '8px',
              height: '48px',
            }}
          >
            <Heart size={16} fill="#2A0811" />
            <span>Respond to Invitation (RSVP)</span>
          </button>
        </div>
      )}
    </header>
  );
};
