import React, { useState, useEffect, useRef } from 'react';
import FeedSection from './FeedSection.jsx';

const ItemDetailModal = ({ item, isOpen, onClose, onContactFinder }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [verificationAnswer, setVerificationAnswer] = useState('');
    const [activeTab, setActiveTab] = useState('chat');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    useEffect(() => {
        if (isOpen && item) {
            loadChatHistory();
        }
    }, [isOpen, item]);

    const loadChatHistory = async () => {
        setIsLoadingMessages(true);
        try {
            const response = await fetch(`http://localhost:3000/api/chats/${item.by}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token') || ''
                }
            });
            if (response.ok) {
                const messages = await response.json();
                setChatMessages(messages);
            }
        } catch (err) {
            console.error("Failed to load chat history:", err);
            // Initialize empty chat
            setChatMessages([]);
        } finally {
            setIsLoadingMessages(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        setIsSendingMessage(true);
        try {
            const response = await fetch(`http://localhost:3000/api/chats/${item.by}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    text: messageInput.trim(),
                    autoReply: true
                })
            });

            if (response.ok) {
                // Add message immediately to UI
                setChatMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    from: 'me',
                    text: messageInput.trim(),
                    timestamp: new Date()
                }]);
                setMessageInput('');
                
                // Reload chat to get auto-reply
                setTimeout(() => {
                    loadChatHistory();
                }, 1200);
            }
        } catch (err) {
            console.error("Failed to send message:", err);
        } finally {
            setIsSendingMessage(false);
        }
    };

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        if (verificationAnswer.trim()) {
            // Show success message
            setChatMessages(prev => [...prev, {
                id: Date.now().toString(),
                from: 'me',
                text: `Verification: ${verificationAnswer}`,
                timestamp: new Date()
            }]);
            setVerificationAnswer('');
            setShowVerification(false);
        }
    };

    if (!isOpen || !item) return null;

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
                maxWidth: '700px',
                height: '80vh',
                borderRadius: 'var(--radius)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--surface)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '32px' }}>{item.emoji}</span>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{item.name || item.title}</h2>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: item.type === 'lost' ? '#FEE2E2' : '#D1FAE5',
                                    color: item.type === 'lost' ? '#EF4444' : '#10B981',
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    marginRight: '8px'
                                }}>
                                    {item.type}
                                </span>
                                {item.match && <span style={{ color: '#1a9e6e', fontWeight: '600' }}>{item.match} Match</span>}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'var(--text-muted)'
                    }}>✕</button>
                </div>

                {/* Content Tabs */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    {/* Details Panel */}
                    <div style={{
                        flex: 1,
                        borderRight: '1px solid var(--border)',
                        overflowY: 'auto',
                        padding: '20px'
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Description</h3>
                            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.description || item.desc}</p>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Location</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                <span>📍</span>
                                <span>{item.location || item.loc}</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Posted By</h3>
                            <div style={{ fontSize: '14px' }}>
                                <strong>{item.by || 'Anonymous'}</strong>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{item.time || 'Recently'}</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Category</h3>
                            <p style={{ fontSize: '14px', margin: 0 }}>{item.category || item.cat}</p>
                        </div>

                        {item.q && (
                            <div style={{
                                backgroundColor: 'var(--surface)',
                                padding: '16px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                marginBottom: '24px'
                            }}>
                                <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Verification Question</h3>
                                <p style={{ fontSize: '13px', margin: 0, fontStyle: 'italic' }}>{item.q}</p>
                                <button 
                                    onClick={() => setShowVerification(true)}
                                    style={{
                                        marginTop: '12px',
                                        padding: '6px 12px',
                                        backgroundColor: '#1a9e6e',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Answer Question
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Chat/Comments Panel */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0
                    }}>
                        {/* Tab Headers */}
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid var(--border)',
                            backgroundColor: 'var(--surface)',
                            padding: '0'
                        }}>
                            <button
                                onClick={() => setActiveTab('chat')}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: 'none',
                                    backgroundColor: activeTab === 'chat' ? 'var(--bg-main)' : 'transparent',
                                    color: activeTab === 'chat' ? 'var(--text-main)' : 'var(--text-muted)',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    borderBottom: activeTab === 'chat' ? '2px solid var(--primary)' : 'none'
                                }}
                            >
                                💬 Messages
                            </button>
                            <button
                                onClick={() => setActiveTab('feed')}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: 'none',
                                    backgroundColor: activeTab === 'feed' ? 'var(--bg-main)' : 'transparent',
                                    color: activeTab === 'feed' ? 'var(--text-main)' : 'var(--text-muted)',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    borderBottom: activeTab === 'feed' ? '2px solid var(--primary)' : 'none'
                                }}
                            >
                                💬 Comments
                            </button>
                        </div>

                        {/* Chat Messages */}
                        {activeTab === 'chat' && (
                            <>
                                <div style={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: '16px',
                                    backgroundColor: 'var(--bg-main)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    {isLoadingMessages ? (
                                        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading messages...</div>
                                    ) : chatMessages.length === 0 ? (
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flex: 1,
                                            color: 'var(--text-muted)',
                                            textAlign: 'center',
                                            padding: '20px'
                                        }}>
                                            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💬</div>
                                            <p style={{ margin: 0 }}>No messages yet</p>
                                            <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>Start a conversation!</p>
                                        </div>
                                    ) : (
                                        chatMessages.map((msg) => (
                                            <div key={msg.id} style={{
                                                display: 'flex',
                                                justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start'
                                            }}>
                                                <div style={{
                                                    maxWidth: '80%',
                                                    padding: '8px 12px',
                                                    borderRadius: msg.from === 'me' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                                                    backgroundColor: msg.from === 'me' ? '#1a9e6e' : 'var(--surface)',
                                                    color: msg.from === 'me' ? 'white' : 'var(--text-main)',
                                                    fontSize: '13px',
                                                    lineHeight: '1.5'
                                                }}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Verification Form */}
                                {showVerification && (
                                    <form onSubmit={handleVerificationSubmit} style={{
                                        padding: '12px',
                                        borderTop: '1px solid var(--border)',
                                        backgroundColor: 'var(--surface)',
                                        display: 'flex',
                                        gap: '8px'
                                    }}>
                                        <input
                                            type="text"
                                            value={verificationAnswer}
                                            onChange={(e) => setVerificationAnswer(e.target.value)}
                                            placeholder="Your answer..."
                                            autoFocus
                                            style={{
                                                flex: 1,
                                                border: '1px solid var(--border)',
                                                borderRadius: '6px',
                                                padding: '8px 10px',
                                                fontSize: '13px',
                                                backgroundColor: 'var(--card-bg)',
                                                color: 'var(--text-main)'
                                            }}
                                        />
                                        <button type="submit" style={{
                                            backgroundColor: '#1a9e6e',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '8px 12px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}>Send</button>
                                        <button 
                                            type="button"
                                            onClick={() => setShowVerification(false)}
                                            style={{
                                                backgroundColor: 'var(--border)',
                                                color: 'var(--text-main)',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '8px 12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >Cancel</button>
                                    </form>
                                )}

                                {/* Message Input */}
                                {!showVerification && (
                                    <form onSubmit={handleSendMessage} style={{
                                        padding: '12px',
                                        borderTop: '1px solid var(--border)',
                                        backgroundColor: 'var(--surface)',
                                        display: 'flex',
                                        gap: '8px'
                                    }}>
                                        <input
                                            type="text"
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            placeholder="Type your message..."
                                            disabled={isSendingMessage}
                                            style={{
                                                flex: 1,
                                                border: '1px solid var(--border)',
                                                borderRadius: '6px',
                                                padding: '8px 10px',
                                                fontSize: '13px',
                                                backgroundColor: 'var(--card-bg)',
                                                color: 'var(--text-main)'
                                            }}
                                        />
                                        <button 
                                            type="submit"
                                            disabled={isSendingMessage || !messageInput.trim()}
                                            style={{
                                                backgroundColor: isSendingMessage || !messageInput.trim() ? 'var(--border)' : '#1a9e6e',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '8px 12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: isSendingMessage || !messageInput.trim() ? 'default' : 'pointer'
                                            }}
                                        >
                                            {isSendingMessage ? 'Sending...' : 'Send'}
                                        </button>
                                    </form>
                                )}
                            </>
                        )}

                        {/* Feed/Comments */}
                        {activeTab === 'feed' && (
                            <FeedSection itemId={item.id} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailModal;
