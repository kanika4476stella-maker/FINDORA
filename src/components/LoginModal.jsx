import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const LoginModal = ({ isOpen, onClose }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('aman@college.edu');
    const [password, setPassword] = useState('password123');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Mock login - in production, this would call a real auth endpoint
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            // Mock token generation
            const mockToken = 'mock-jwt-token-' + Date.now();
            login(mockToken);
            
            // Reset form
            setEmail('aman@college.edu');
            setPassword('password123');
            onClose();
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                width: '100%',
                maxWidth: '400px',
                borderRadius: 'var(--radius)',
                padding: '32px',
                position: 'relative',
                boxShadow: 'var(--shadow-md)',
                animation: 'fadeIn 0.3s ease'
            }} onClick={e => e.stopPropagation()}>
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'var(--text-muted)'
                    }}
                >✕</button>

                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Welcome Back</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Sign in to your Findora account</p>
                
                {error && (
                    <div style={{
                        backgroundColor: '#FEE2E2',
                        color: '#EF4444',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '13px',
                        border: '1px solid #FECACA'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@college.edu"
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '8px', 
                                border: '1px solid var(--border)', 
                                backgroundColor: 'var(--surface)', 
                                color: 'var(--text-main)',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '8px', 
                                border: '1px solid var(--border)', 
                                backgroundColor: 'var(--surface)', 
                                color: 'var(--text-main)',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        style={{ 
                            padding: '12px', 
                            borderRadius: '8px', 
                            border: 'none', 
                            backgroundColor: 'var(--primary)', 
                            color: 'white', 
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: isLoading ? 'default' : 'pointer',
                            opacity: isLoading ? 0.7 : 1,
                            marginTop: '16px',
                            boxShadow: 'var(--shadow-md)'
                        }}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <p style={{ fontSize: '12px', textAlign: 'center', color: 'var(--text-muted)', margin: 0 }}>Demo: Use any email/password</p>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
