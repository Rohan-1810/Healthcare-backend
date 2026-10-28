import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is required',
        errors: [],
      });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'healthcare_fallback_secret_for_development';

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        errors: [],
      });
    }

    const userId = decoded.id || decoded.sub;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists',
        errors: [],
      });
    }

    // Attach authenticated user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateToken;
