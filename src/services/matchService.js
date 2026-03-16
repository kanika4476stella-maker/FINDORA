import api from './api';

/**
 * Searches for items based on a natural language query.
 * Uses AI to understand plain language problems and find matches.
 * @param {string} query - The search query in plain language.
 * @returns {Promise<Object>} - The search results with matched items.
 */
export const searchItems = async (query) => {
    if (!query || typeof query !== 'string') {
        throw new Error('Query cannot be empty');
    }

    try {
        const response = await api.post('/match', { query: query.trim() });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Matching failed');
        }
        throw new Error('Network error. Check your connection.');
    }
};

/**
 * Capitalizes the first letter of the reason string.
 * @param {string} reason - The reason for the match.
 * @returns {string} - Capitalized reason.
 */
export const formatMatchReason = (reason) => {
    if (!reason) return '';
    return reason.charAt(0).toUpperCase() + reason.slice(1);
};

/**
 * Get all unreported/unrecovered items
 * @returns {Promise<Array>} - Array of unreported items
 */
export const getUnrecoveredItems = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/items');
        if (response.ok) {
            const items = await response.json();
            // Filter for unrecovered items (future enhancement with recovery status)
            return items.filter(item => !item.recovered);
        }
        return [];
    } catch (err) {
        console.error('Failed to fetch unrecovered items:', err);
        return [];
    }
};
