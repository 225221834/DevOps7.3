const jwt = require('jsonwebtoken');

// Middleware to authenticate and authorize 'seller' users
module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach userId and role to req
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied: Sellers only' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};