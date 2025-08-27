const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Check if the token is sent in the headers and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};