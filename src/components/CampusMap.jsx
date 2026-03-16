import React, { useState, useEffect } from 'react';

const CampusMap = ({ isOpen, onClose }) => {
    const [items, setItems] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchItems();
        }
    }, [isOpen]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/items');
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            }
        } catch (err) {
            console.error('Failed to fetch items:', err);
        } finally {
            setLoading(false);
        }
    };

    // Campus locations with coordinates (relative to map)
    const campusLocations = {
        'Library, 2nd Floor': { x: 20, y: 30, color: '#FF6B6B' },
        'Canteen, Block A': { x: 60, y: 50, color: '#4ECDC4' },
        'CSE Dept., Corridor': { x: 40, y: 20, color: '#45B7D1' },
        'Hostel Entrance': { x: 80, y: 70, color: '#96CEB4' },
        'Lab 3, Block B': { x: 30, y: 60, color: '#FFEAA7' },
        'Seminar Hall': { x: 70, y: 40, color: '#DDA0DD' },
        'Sports Complex': { x: 50, y: 80, color: '#FF8C94' },
        'Gym, Ground Floor': { x: 15, y: 75, color: '#95E1D3' }
    };

    const getLocationCoords = (location) => {
        const cleanLoc = location || '';
        return campusLocations[cleanLoc] || { x: Math.random() * 90, y: Math.random() * 90 };
    };

    const groupedItems = {};
    items.forEach(item => {
        const loc = item.location || item.loc || 'Unknown';
        if (!groupedItems[loc]) {
            groupedItems[loc] = [];
        }
        groupedItems[loc].push(item);
    });

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
                maxHeight: '90vh',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
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
                        <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>🗺️ Campus Map</h2>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                            Lost & Found items locations around campus
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

                {/* Items Grid View */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{
                        flex: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        backgroundColor: 'var(--bg-main)'
                    }}>
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                                Loading items...
                            </div>
                        ) : items.length === 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', textAlign: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>🗂️</div>
                                    <p>No items reported yet</p>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                                {items.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedLocation(item)}
                                        style={{
                                            backgroundColor: selectedLocation?.id === item.id ? 'var(--primary)' : 'var(--surface)',
                                            color: selectedLocation?.id === item.id ? 'white' : 'var(--text-main)',
                                            border: selectedLocation?.id === item.id ? 'none' : '1px solid var(--border)',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                            <span style={{ fontSize: '24px', minWidth: '28px' }}>{item.emoji}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '2px' }}>
                                                    {item.name || item.title}
                                                </div>
                                                <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>
                                                    📍 {item.location || item.loc}
                                                </div>
                                                <div style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', width: 'fit-content', backgroundColor: item.type === 'lost' ? (selectedLocation?.id === item.id ? 'rgba(255,255,255,0.2)' : '#FEE2E2') : (selectedLocation?.id === item.id ? 'rgba(255,255,255,0.2)' : '#D1FAE5'), color: item.type === 'lost' ? (selectedLocation?.id === item.id ? 'white' : '#EF4444') : (selectedLocation?.id === item.id ? 'white' : '#10B981') }}>
                                                    {item.type === 'lost' ? '❌ Lost' : '✅ Found'}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Item Details Preview */}
                {selectedLocation && (
                    <div style={{
                        padding: '16px',
                        backgroundColor: 'var(--surface)',
                        borderTop: '1px solid var(--border)',
                        maxHeight: '140px',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{ fontSize: '28px', minWidth: '36px' }}>{selectedLocation.emoji}</span>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700' }}>
                                    {selectedLocation.name || selectedLocation.title}
                                </h4>
                                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                                    📍 {selectedLocation.location || selectedLocation.loc}
                                </p>
                                <p style={{ margin: '0 0 8px 0', fontSize: '12px', lineHeight: '1.4' }}>
                                    {selectedLocation.description || selectedLocation.desc}
                                </p>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => setSelectedLocation(null)}
                                        style={{
                                            backgroundColor: '#1a9e6e',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '6px 12px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View Full Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampusMap;
