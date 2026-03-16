import React, { useState } from 'react';

const ReportModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        category: 'electronics',
        type: 'found',
        location: '',
        description: '',
        emoji: '📦',
        recovered: false,
        q: '' // Verification question
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const emojis = {
        'electronics': '📱',
        'id_cards': '🪪',
        'books': '📓',
        'keys': '🔑',
        'clothing': '🧥',
        'wallet': '👛',
        'other': '📦'
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const newData = { 
                ...prev, 
                [name]: type === 'checkbox' ? checked : value 
            };
            // Auto-populate title from name if not set
            if (name === 'name' && !prev.title) {
                newData.title = value;
            }
            // Update emoji based on category
            if (name === 'category') {
                newData.emoji = emojis[value] || '📦';
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const submitData = {
                ...formData,
                title: formData.title || formData.name,
                recovered: formData.recovered
            };

            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });
            if (response.ok) {
                onRefresh();
                onClose();
                setFormData({
                    title: '',
                    name: '',
                    category: 'electronics',
                    type: 'found',
                    location: '',
                    description: '',
                    emoji: '📱',
                    recovered: false,
                    q: ''
                });
            }
        } catch (err) {
            console.error("Failed to submit item:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                maxWidth: '500px',
                borderRadius: 'var(--radius)',
                padding: '32px',
                position: 'relative',
                boxShadow: 'var(--shadow-md)',
                animation: 'fadeIn 0.3s ease',
                maxHeight: '90vh',
                overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Report Item</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Fill in the details to help others find what they lost.</p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="flex gap-4">
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Item Name</label>
                            <input 
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Sony WH-1000XM4"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}
                            />
                        </div>
                        <div style={{ width: '100px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Type</label>
                            <select 
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}
                            >
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}
                            >
                                <option value="electronics">Electronics</option>
                                <option value="id_cards">ID Card</option>
                                <option value="books">Books</option>
                                <option value="keys">Keys</option>
                                <option value="clothing">Clothing</option>
                                <option value="wallet">Wallet</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Location</label>
                            <input 
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Library 2nd Floor"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Description</label>
                        <textarea 
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Add specifics like colour, brand, or markings..."
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', resize: 'none' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Verification Question (Optional)</label>
                        <input 
                            name="q"
                            value={formData.q}
                            onChange={handleChange}
                            placeholder="e.g. What color is the lanyard?"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}
                        />
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Ask a question to verify the item belongs to the person claiming it</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <input 
                            type="checkbox"
                            id="recovered"
                            name="recovered"
                            checked={formData.recovered}
                            onChange={handleChange}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="recovered" style={{ fontSize: '13px', fontWeight: '500', cursor: 'pointer', margin: 0 }}>
                            Mark as recovered ✓
                        </label>
                    </div>

                    <div className="flex gap-4" style={{ marginTop: '12px' }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{ 
                                flex: 1, 
                                padding: '12px', 
                                borderRadius: '8px', 
                                border: 'none', 
                                backgroundColor: 'var(--primary)', 
                                color: 'white', 
                                fontWeight: '600',
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'default' : 'pointer',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
