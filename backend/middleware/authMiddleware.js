const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log('Token received:', token);
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log('Decoded token:', decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


module.exports = authMiddleware;
