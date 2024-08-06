const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    console.log('No token received');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || config.get('jwtSecret'));
    
    // Correct the assignment of req.user based on payload structure
    req.user = decoded.user || { id: decoded.userId };
    
    console.log('Token received and verified:', actualToken);
    console.log('Decoded user:', req.user);
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
