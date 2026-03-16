import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import LoginModal from './LoginModal.jsx';
import NotificationCenter from './NotificationCenter.jsx';
import CampusMap from './CampusMap.jsx';
import AboutSection from './AboutSection.jsx';

const Navbar = ({ onReportClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCampusMapOpen, setIsCampusMapOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [unrecoveredCount, setUnrecoveredCount] = useState(0);

  useEffect(() => {
    // Fetch unrecovered items count
    const fetchUnrecoveredCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items');
        if (response.ok) {
          const items = await response.json();
          const count = items.filter(item => !item.recovered).length;
          setUnrecoveredCount(count);
        }
      } catch (err) {
        console.error('Failed to fetch unrecovered count:', err);
      }
    };

    fetchUnrecoveredCount();
    // Refresh every 30 seconds
    const interval = setInterval(fetchUnrecoveredCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav style={{
        height: '72px',
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container flex justify-between items-center" style={{ width: '100%' }}>
          <div className="brand flex items-center gap-2" style={{
            fontSize: '28px',
            fontWeight: '850',
            color: 'var(--nav-text)',
            letterSpacing: '-0.02em',
            cursor: 'pointer'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Findora
          </div>
          
          <div className="nav-links flex gap-6" style={{ color: 'var(--nav-text)', opacity: 0.7, fontSize: '14px', fontWeight: '500' }}>
            <a href="#" style={{ opacity: 1 }}>Feed</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsAboutOpen(true); }}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsCampusMapOpen(true); }}>Campus Map</a>
          </div>

          <div className="auth-btns flex items-center gap-2" style={{ gap: '12px' }}>
            <button 
              onClick={toggleTheme}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--nav-text)',
                fontSize: '18px',
                cursor: 'pointer'
              }}
              title="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button 
              onClick={() => setIsNotificationOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--nav-text)',
                fontSize: '18px',
                cursor: 'pointer',
                position: 'relative'
              }}
              title={`${unrecoveredCount} unrecovered items`}
            >
              🔔
              {unrecoveredCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700',
                  border: '2px solid var(--nav-bg)'
                }}>
                  {unrecoveredCount}
                </span>
              )}
            </button>

            {user ? (
              <>
                <div style={{
                  color: 'var(--nav-text)',
                  fontSize: '13px',
                  minWidth: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {user.name}
                </div>
                <button 
                  onClick={logout}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--nav-text)',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    opacity: 0.8
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--nav-text)',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            )}
            <button 
              onClick={onReportClick}
              style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '99px',
                fontSize: '13px',
                fontWeight: '600',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Report Found
            </button>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <NotificationCenter 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <CampusMap
        isOpen={isCampusMapOpen}
        onClose={() => setIsCampusMapOpen(false)}
      />

      <AboutSection
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </>
  );
};

export default Navbar;
