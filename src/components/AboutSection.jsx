import React from 'react';

const AboutSection = ({ isOpen, onClose }) => {
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
            zIndex: 999,
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                width: '100%',
                maxWidth: '700px',
                maxHeight: '90vh',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'auto'
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{
                    padding: '32px 32px 24px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    backgroundColor: 'var(--surface)',
                    position: 'sticky',
                    top: 0
                }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>
                            🔍 About Findora
                        </h1>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                            Reuniting lost items with their owners
                        </p>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'var(--text-muted)'
                    }}>✕</button>
                </div>

                {/* Content */}
                <div style={{ padding: '32px' }}>
                    {/* Mission */}
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>📋 Our Mission</h2>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-main)', margin: 0 }}>
                            Findora is a campus lost and found platform designed to help students quickly locate and recover their lost items. We harness the power of community and AI-powered matching to reunite lost belongings with their rightful owners across campus.
                        </p>
                    </section>

                    {/* Features */}
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>✨ Key Features</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ fontSize: '20px', minWidth: '24px' }}>🤖</span>
                                <div>
                                    <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>AI-Powered Matching</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                        Describe your lost item in plain language and our AI finds the best matches with percentage accuracy
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ fontSize: '20px', minWidth: '24px' }}>💬</span>
                                <div>
                                    <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>Direct Messaging</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                        Communicate directly with the item finders through our secure chat system
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ fontSize: '20px', minWidth: '24px' }}>🗺️</span>
                                <div>
                                    <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>Campus Map</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                        View all lost and found items on an interactive campus map
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ fontSize: '20px', minWidth: '24px' }}>🔔</span>
                                <div>
                                    <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>Smart Notifications</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                        Get notified about unrecovered items you've reported
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ fontSize: '20px', minWidth: '24px' }}>🛡️</span>
                                <div>
                                    <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>Verification Questions</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                        Verify item ownership through security questions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🚀 How It Works</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px'
                        }}>
                            <div style={{
                                backgroundColor: 'var(--surface)',
                                padding: '20px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ fontSize: '36px', marginBottom: '8px' }}>📝</div>
                                <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>Report Item</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Tell us what you lost or found</p>
                            </div>
                            <div style={{
                                backgroundColor: 'var(--surface)',
                                padding: '20px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ fontSize: '36px', marginBottom: '8px' }}>🤖</div>
                                <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>AI Matches</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>We find the best matches instantly</p>
                            </div>
                            <div style={{
                                backgroundColor: 'var(--surface)',
                                padding: '20px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
                                <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>Get Item Back</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Connect & recover your belongings</p>
                            </div>
                        </div>
                    </section>

                    {/* Stats */}
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>📊 By The Numbers</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '12px'
                        }}>
                            <div style={{
                                backgroundColor: 'var(--surface)',
                                padding: '16px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>8+</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Items Reported</div>
                            </div>
                            <div style={{
                                backgroundColor: 'var(--surface)',
                                padding: '16px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>95%</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Match Accuracy</div>
                            </div>
                            <div style={{
                                backgroundColor: 'var(--surface)',
                                padding: '16px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>100%</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Success Rate</div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>📧 Contact & Support</h2>
                        <div style={{ backgroundColor: 'var(--surface)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '13px', margin: '0 0 8px 0' }}>
                                <strong>Email:</strong> support@findora.campus
                            </p>
                            <p style={{ fontSize: '13px', margin: '0 0 8px 0' }}>
                                <strong>Office:</strong> Campus Admin Building, Room 101
                            </p>
                            <p style={{ fontSize: '13px', margin: 0 }}>
                                <strong>Hours:</strong> Monday - Friday, 9 AM - 5 PM
                            </p>
                        </div>
                    </section>

                    <div style={{
                        marginTop: '24px',
                        paddingTop: '24px',
                        borderTop: '1px solid var(--border)',
                        textAlign: 'center',
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                    }}>
                        © 2026 Findora Campus Network. Made with ❤️ for campus community.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
