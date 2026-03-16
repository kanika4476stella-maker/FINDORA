import React, { useState, useEffect } from 'react';

const FeedSection = ({ itemId, itemName }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadComments();
    }, [itemId]);

    const loadComments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/feed/${itemId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            }
        } catch (err) {
            console.error('Failed to load comments:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:3000/api/feed/${itemId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({ text: newComment.trim() })
            });

            if (response.ok) {
                const comment = await response.json();
                setComments(prev => [...prev, comment]);
                setNewComment('');
            }
        } catch (err) {
            console.error('Failed to add comment:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (commentId) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/feed/${itemId}/${commentId}/like`,
                {
                    method: 'POST',
                    headers: {
                        'x-auth-token': localStorage.getItem('token') || ''
                    }
                }
            );

            if (response.ok) {
                const updatedComment = await response.json();
                setComments(prev =>
                    prev.map(c => c.id === commentId ? updatedComment : c)
                );
            }
        } catch (err) {
            console.error('Failed to like comment:', err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>💬 Activity Feed</h3>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    style={{
                        flex: 1,
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        padding: '8px 10px',
                        fontSize: '12px',
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text-main)',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    style={{
                        backgroundColor: !newComment.trim() ? 'var(--border)' : '#1a9e6e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: newComment.trim() ? 'pointer' : 'default'
                    }}
                >
                    {isSubmitting ? 'Posting...' : 'Post'}
                </button>
            </form>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {loading ? (
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
                        Loading comments...
                    </div>
                ) : comments.length === 0 ? (
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    comments.map(comment => (
                        <div
                            key={comment.id}
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '6px',
                                padding: '10px',
                                fontSize: '12px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                <div>
                                    <strong style={{ color: 'var(--text-main)' }}>{comment.user}</strong>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                        {new Date(comment.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <p style={{ margin: '0 0 8px 0', color: 'var(--text-main)', lineHeight: '1.4' }}>
                                {comment.text}
                            </p>
                            <button
                                onClick={() => handleLike(comment.id)}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid var(--border)',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.borderColor = '#1a9e6e';
                                    e.target.style.color = '#1a9e6e';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.borderColor = 'var(--border)';
                                    e.target.style.color = 'var(--text-muted)';
                                }}
                            >
                                👍 {comment.likes > 0 ? comment.likes : 'Like'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FeedSection;
