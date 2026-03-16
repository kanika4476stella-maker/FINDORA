import React, { useState, useEffect } from 'react';
import ItemDetailModal from './ItemDetailModal.jsx';

const ItemFeed = () => {
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/items');
                if (response.ok) {
                    const data = await response.json();
                    setAllItems(data);
                    setFilteredItems(data);
                } else {
                    const mock = [
                        {id:'1', emoji:'🪪', name:'Student ID Card', title:'Student ID Card', type:'lost', category:'id_cards', cat:'ID Card', location:'Library, 2nd Floor', loc:'Library, 2nd Floor', time:'8 min ago', by:'Riya S.', description:'White card with blue lanyard, student photo visible', desc:'White card with blue lanyard', match:'94%', q:'What is written on the back of your ID card?', urgent:true},
                        {id:'2', emoji:'🎧', name:'Sony Earphones', title:'Sony Earphones', type:'found', category:'electronics', cat:'Electronics', location:'Canteen, Block A', loc:'Canteen, Block A', time:'22 min ago', by:'Dev P.', description:'Black Sony WI-C100, small scratch on left earbud', desc:'Black Sony WI-C100', match:'94%', q:'What colour is the carrying case?', urgent:false}
                    ];
                    setAllItems(mock);
                    setFilteredItems(mock);
                }
            } catch (err) {
                console.error("Fetch items failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    useEffect(() => {
        const filtered = allItems.filter(item => {
            const name = item.title || item.name || '';
            const desc = item.desc || item.description || '';
            const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = filterType === 'all' || item.type === filterType;
            return matchesSearch && matchesType;
        });
        setFilteredItems(filtered);
    }, [searchQuery, filterType, allItems]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsDetailModalOpen(true);
    };

    if (loading) return <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Loading items...</div>;

    return (
        <section style={{ padding: '60px 0' }}>
            <div className="container">
                <div className="flex justify-between items-center" style={{ marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Recent Updates</h2>
                    
                    <div className="flex gap-4 items-center" style={{ flex: 1, minWidth: '300px', justifyContent: 'flex-end' }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                            <input 
                                type="text"
                                placeholder="Search items..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 10px 10px 36px', 
                                    borderRadius: '12px', 
                                    border: '1px solid var(--border)', 
                                    backgroundColor: 'var(--surface)', 
                                    color: 'var(--text-main)',
                                    outline: 'none',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '13px', fontWeight: '500', outline: 'none' }}
                        >
                            <option value="all">All Types</option>
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                        </select>
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px dashed var(--border)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>No items found</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                        {filteredItems.map(item => (
                            <div key={item.id} style={{
                                backgroundColor: 'var(--card-bg)',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)',
                                padding: '20px',
                                transition: 'var(--transition)',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onClick={() => handleItemClick(item)}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '32px' }}>{item.emoji}</span>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                        backgroundColor: item.type === 'lost' ? '#FEE2E2' : '#D1FAE5',
                                        color: item.type === 'lost' ? '#EF4444' : '#10B981'
                                    }}>{item.type}</span>
                                </div>
                                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{item.title || item.name}</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>{item.desc || item.description}</p>
                                
                                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                                        <span>📍</span> {item.loc || item.location}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Posted by {item.by || 'Anonymous'}</span>
                                        {item.match && (
                                            <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}>
                                                {item.match} match
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ItemDetailModal 
                item={selectedItem}
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedItem(null);
                }}
            />
        </section>
    );
};

export default ItemFeed;
