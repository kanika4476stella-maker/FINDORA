import React, { useState, useEffect, useRef, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { searchItems, formatMatchReason } from '../../services/matchService';

const AISearchAssistant = forwardRef(({ onContactFinder }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'init-1',
            role: 'ai',
            content: "🤖 **Findora AI Assistant**\n\nHey! I understand plain language problems. Just describe what you lost in your own words, and I'll search through all campus reports to find the best matches for you.\n\n**Examples:**\n• 'I lost my black Sony headphones near the canteen'\n• 'My blue notebook went missing from the CSE department'\n• 'Can't find my student ID, it has a blue lanyard'\n• 'Lost Dell charger, 65W, saw it last at the library'\n\n**I'll give you:**\n✓ Best matching items with percentage accuracy\n✓ Why each item matches your description\n✓ Direct contact with the item finders",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    useImperativeHandle(ref, () => ({
        openChat: () => setIsOpen(true),
        closeChat: () => setIsOpen(false)
    }));

    const suggestions = [
        "I lost my Sony earphones near the canteen",
        "Can't find my blue notebook from CSE",
        "Missing student ID card with blue lanyard",
        "Lost my Dell laptop charger, black 65W"
    ];

    const handleSubmit = async (text = input) => {
        const query = text.trim();
        if (!query || isLoading) return;

        const userMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: query,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const data = await searchItems(query);
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: data.matches || [],
                matchCount: data.matches?.length || 0,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            const errorMsg = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: `${err.message || 'Something went wrong'}. Please try again with more specific details.`,
                isError: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSuggestionClick = (text) => {
        handleSubmit(text);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#1a9e6e'; // Green - Excellent match
        if (score >= 60) return '#3B82F6'; // Blue - Good match
        if (score >= 40) return '#F59E0B'; // Orange - Possible match
        return '#EF4444'; // Red - Low match
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent Match';
        if (score >= 60) return 'Good Match';
        if (score >= 40) return 'Possible Match';
        return 'Low Match';
    };

    return (
        <>
            {/* Floating Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#1a9e6e',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                className="ai-assistant-toggle"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        bottom: window.innerWidth < 480 ? '0' : '88px',
                        right: window.innerWidth < 480 ? '0' : '24px',
                        width: window.innerWidth < 480 ? '100%' : '380px',
                        height: window.innerWidth < 480 ? '100%' : '520px',
                        backgroundColor: 'var(--card-bg)',
                        borderRadius: window.innerWidth < 480 ? '0' : '16px',
                        border: '1px solid var(--border)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1000,
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="status-dot"></div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Findora AI</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ask about your lost item</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '4px' }}>✕</button>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'var(--bg-main)' }}>
                        {messages.map((msg) => (
                            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: msg.role === 'user' ? '80%' : '90%' }}>
                                <div style={{ 
                                    padding: '10px 12px', 
                                    borderRadius: msg.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                                    backgroundColor: msg.role === 'user' ? '#1a9e6e' : 'var(--surface)',
                                    color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                    border: msg.role === 'user' ? 'none' : '1px solid var(--border)'
                                }}>
                                    {Array.isArray(msg.content) ? (
                                        <div>
                                            {msg.content.length > 0 ? (
                                                <>
                                                    <div style={{ marginBottom: '12px', fontWeight: '600', color: 'var(--text-main)' }}>
                                                        ✅ Found {msg.content.length} match{msg.content.length !== 1 ? 'es' : ''} for you!
                                                    </div>
                                                    {msg.content.map((item, idx) => (
                                                        <div key={item.id} style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', marginBottom: '10px', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => onContactFinder(item)}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                                                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                                                    <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                                                                    <span>{item.name}</span>
                                                                </div>
                                                                <div style={{ fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '6px', backgroundColor: getScoreColor(item.score), color: 'white', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                                                                    {item.score}%
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: '10px', color: getScoreColor(item.score), fontWeight: '600', marginBottom: '8px' }}>
                                                                {getScoreLabel(item.score)}
                                                            </div>
                                                            <div style={{ height: '4px', width: '100%', backgroundColor: 'var(--border)', borderRadius: '2px', marginBottom: '10px', overflow: 'hidden' }}>
                                                                <div style={{ height: '100%', width: `${item.score}%`, backgroundColor: getScoreColor(item.score), borderRadius: '2px', transition: 'width 0.3s' }}></div>
                                                            </div>
                                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                📍 <strong>{item.location}</strong>
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: 'var(--text-main)', marginBottom: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                                                                <strong>Why it matches:</strong> {item.reason || 'Similar to your description'}
                                                            </div>
                                                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                                                                Found by <strong>{item.by}</strong> • {item.time}
                                                            </div>
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); onContactFinder(item); }}
                                                                style={{ width: '100%', backgroundColor: '#1a9e6e', color: 'white', border: 'none', borderRadius: '6px', padding: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                                                                onMouseOver={(e) => e.target.style.backgroundColor = '#158854'}
                                                                onMouseOut={(e) => e.target.style.backgroundColor = '#1a9e6e'}
                                                            >
                                                                💬 Contact Finder
                                                            </button>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <div style={{ 
                                                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                                                    border: '1px solid rgba(249, 115, 22, 0.3)',
                                                    borderRadius: '10px',
                                                    padding: '12px'
                                                }}>
                                                    <div style={{ marginBottom: '10px', fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>
                                                        ❌ No Match Found
                                                    </div>
                                                    <div style={{ marginBottom: '10px', fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                                                        Your item has probably <strong>not yet been reported</strong> on campus. But don't worry! 
                                                    </div>
                                                    <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px', marginBottom: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                                                        <div style={{ marginBottom: '6px' }}>💡 <strong>Try:</strong></div>
                                                        <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '10px' }}>
                                                            <li>Adding more specific details (color, brand, size)</li>
                                                            <li>Describing where you last saw it</li>
                                                            <li>Mentioning any special marks or features</li>
                                                        </ul>
                                                    </div>
                                                    <div style={{ backgroundColor: 'rgba(26, 158, 110, 0.1)', border: '1px solid rgba(26, 158, 110, 0.3)', borderRadius: '8px', padding: '10px', fontSize: '11px', color: 'var(--text-main)' }}>
                                                        <div style={{ marginBottom: '4px' }}>🔄 <strong>Discover Later:</strong></div>
                                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Keep checking back! Someone might report finding your item soon.</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : msg.isError ? (
                                        <div style={{ color: '#EF4444' }}>{msg.content}</div>
                                    ) : (
                                        <div>{msg.content}</div>
                                    )}
                                </div>
                                {msg.id === 'init-1' && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                                        {suggestions.map((text, i) => (
                                            <button key={i} onClick={() => handleSuggestionClick(text)} style={{ fontSize: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '4px 10px', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.target.style.borderColor = '#1a9e6e'} onMouseOut={e => e.target.style.borderColor = 'var(--border)'}>
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px 12px 12px 3px', padding: '10px 12px' }}>
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Row */}
                    <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                            <textarea 
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe your item..."
                                style={{
                                    flex: 1,
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '13px',
                                    backgroundColor: 'var(--card-bg)',
                                    color: 'var(--text-main)',
                                    resize: 'none',
                                    maxHeight: '80px',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                                rows="1"
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
                                }}
                            />
                            <button 
                                onClick={() => handleSubmit()}
                                disabled={!input.trim() || isLoading}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: (!input.trim() || isLoading) ? 'var(--border)' : '#1a9e6e',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .status-dot {
                    width: 7px;
                    height: 7px;
                    background-color: #1a9e6e;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px rgba(26, 158, 110, 0.2);
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                    100% { transform: scale(0.95); opacity: 1; }
                }
                .typing-indicator span {
                    height: 6px;
                    width: 6px;
                    float: left;
                    margin: 0 1px;
                    background-color: #94A3B8;
                    display: block;
                    border-radius: 50%;
                    opacity: 0.4;
                    animation: bounce 1.3s infinite ease-in-out;
                }
                .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
                .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </>
    );
});

AISearchAssistant.displayName = 'AISearchAssistant';

export default AISearchAssistant;
