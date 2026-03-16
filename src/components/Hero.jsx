import React from 'react';

const Hero = ({ onStartSearching, onHowItWorks }) => {
    return (
        <section style={{
            padding: '120px 0 80px',
            background: 'var(--bg-main)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Background Blob for Theme Effect */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: '0.05',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>
            <div className="container fade-in" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 16px',
                    backgroundColor: 'var(--surface)',
                    borderRadius: '100px',
                    border: '1px solid var(--border)',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--primary)',
                    marginBottom: '24px',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
                    Verified campus recovery network
                </div>
                
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: 'var(--text-main)',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1',
                    marginBottom: '20px',
                    maxWidth: '800px',
                    margin: '0 auto 20px'
                }}>
                    Recover your lost items <br/>
                    <span style={{ color: 'var(--primary)' }}>with Campus Intelligence</span>
                </h1>
                
                <p style={{
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    maxWidth: '600px',
                    margin: '0 auto 32px',
                    lineHeight: '1.6'
                }}>
                    Findora connects students to reunite lost belongings instantly. 
                    Ask our AI assistant to search the campus database for you.
                </p>

                <div className="flex gap-4 items-center" style={{ justifyContent: 'center' }}>
                    <button 
                        onClick={onStartSearching}
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: 'var(--radius)',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >Start Searching</button>
                    <button 
                        onClick={onHowItWorks}
                        style={{
                            backgroundColor: 'var(--surface)',
                            color: 'var(--text-main)',
                            padding: '12px 32px',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                    >How it works</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
