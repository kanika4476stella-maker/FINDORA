import React, { useState, useEffect } from 'react';

const NotificationCenter = ({ isOpen, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen]);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/items');
            if (response.ok) {
                const items = await response.json();
                // Create notifications for unrecovered items
                const unrecoveredNotifs = items
                    .filter(item => !item.recovered)
                    .map(item => ({
                        id: item.id,
                        type: 'unrecovered',
                        title: `${item.emoji} ${item.title || item.name}`,
                        message: `Still looking for ${item.title || item.name} - reported ${item.time}`,
                        item: item,
                        timestamp: new Date(),
                        icon: item.type === 'lost' ? '❌' : '✅'
                    }));
                
                setNotifications(unrecoveredNotifs);
            }
        } catch (err) {
            console.error('Failed to load notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRecovered = async (itemId) => {
        try {
            // In a real app, this would update the backend
            setNotifications(prev => prev.filter(n => n.id !== itemId));
        } catch (err) {
            console.error('Failed to mark as recovered:', err);
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
            zIndex: 999,
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                width: '100%',
                maxWidth: '500px',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '80vh'
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
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>🔔 Notifications</h2>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                            {notifications.length} unrecovered item{notifications.length !== 1 ? 's' : ''}
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

                {/* Notifications List */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px'
                }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                            Loading notifications...
                        </div>
                    ) : notifications.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px 20px'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✨</div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>All caught up!</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                All your reported items have been recovered 🎉
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {notifications.map(notif => (
                                <div key={notif.id} style={{
                                    backgroundColor: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '12px'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>
                                            {notif.title}
                                        </h4>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 8px 0' }}>
                                            {notif.message}
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                                            <span>📍 {notif.item.location || notif.item.loc}</span>
                                            <span>👤 {notif.item.by}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <button
                                            onClick={() => markAsRecovered(notif.id)}
                                            style={{
                                                backgroundColor: '#1a9e6e',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '6px 12px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            ✓ Recovered
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;
