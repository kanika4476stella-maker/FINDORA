import React from 'react';

const Toast = ({ message, visible, type = 'info' }) => {
    if (!visible) return null;

    const colors = {
        info: '#1a9e6e',
        error: '#EF4444',
        warning: '#F59E0B'
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            backgroundColor: colors[type],
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: 'var(--shadow-md)',
            zIndex: 2000,
            animation: 'slideIn 0.3s ease-out',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {message}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Toast;
