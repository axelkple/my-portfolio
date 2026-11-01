import jwt from 'jsonwebtoken';
import { isRevoked } from '../utils/tokenBlacklist.js';

// Accepts the token from the httpOnly cookie or an "Authorization: Bearer" header
const getToken = (req) => {
  if (req.cookies?.token) return req.cookies.token;
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  return scheme === 'Bearer' && token ? token : null;
};

export const requireAuth = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // { id, jti, iat, exp }
    if (isRevoked(payload.jti)) {
      return res.status(401).json({ message: 'Token has been signed out' });
    }
    req.auth = payload;
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    res.status(401).json({ message });
  }
};

export const requireSelf = (req, res, next) => {
  if (req.auth.id !== req.params.id) {
    return res.status(403).json({ message: 'You can only modify your own account' });
  }
  next();
};