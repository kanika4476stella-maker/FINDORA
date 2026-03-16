import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ItemFeed from './components/ItemFeed.jsx';
import ReportModal from './components/ReportModal.jsx';
import AboutSection from './components/AboutSection.jsx';
import AISearchAssistant from './components/common/AISearchAssistant.jsx';
import Toast from './components/common/Toast.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState(null);
  const aiAssistantRef = useRef(null);

  const showToast = (message, type = 'success') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = () => {
      setRefreshKey(prev => prev + 1);
      showToast("Report submitted successfully!");
  };

  const handleContactFinder = (item) => {
      showToast(`Request sent to ${item.by || 'the finder'}! Check your emails.`);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App" style={{ paddingTop: '72px' }}>
          <Navbar onReportClick={() => setIsModalOpen(true)} />
          <main>
            <Hero onStartSearching={() => aiAssistantRef.current?.openChat()} onHowItWorks={() => setIsAboutOpen(true)} />
            <ItemFeed key={refreshKey} />
          </main>
          
          <ReportModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onRefresh={handleRefresh} 
          />

          <AboutSection 
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
          />
        
        <footer style={{ backgroundColor: '#0F172A', color: 'white', padding: '60px 0 30px' }}>
            <div className="container">
                <div className="flex justify-between items-center" style={{ marginBottom: '40px' }}>
                    <div className="brand flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '850' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        Findora
                    </div>
                    <div className="flex gap-8" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                        <a href="#">About</a>
                        <a href="#">Safety</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    © 2026 Findora Campus Network. All rights reserved.
                </div>
            </div>
        </footer>

        <AISearchAssistant ref={aiAssistantRef} onContactFinder={handleContactFinder} />
        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </AuthProvider>
  </ThemeProvider>
  );
}

export default App;
