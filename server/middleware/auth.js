import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        // For development/demo purposes, use a mock user
        req.user = { id: '123', name: 'Kanika Singh', email: 'kanika@college.edu' };
        return next();
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded.user;
        next();
    } catch (err) {
        // If token verification fails, still allow with mock user for demo
        req.user = { id: '123', name: 'Kanika Singh', email: 'kanika@college.edu' };
        next();
    }
};
