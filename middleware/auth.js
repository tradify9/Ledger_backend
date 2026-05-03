// middleware/auth.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('🔑 JWT_SECRET missing in .env');
      return res.status(500).json({ message: 'Server config error' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    if (!req.admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }
    next();
  } catch (error) {
    console.error('🔐 Auth error:', error.message);
    console.error('Token:', token ? token.substring(0,20) + '...' : 'missing');
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

// Admin middleware - checks if user is authenticated as admin
export const admin = async (req, res, next) => {
  // First check if admin exists from protect middleware
  if (!req.admin) {
    return res.status(401).json({ message: 'Not authenticated as admin' });
  }
  
  // Check if admin has admin role or is active
  if (req.admin.role === 'admin' || req.admin.role === 'super-admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin. Admin access required.' });
  }
};

// Optional: Super admin only middleware
export const superAdminOnly = async (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  if (req.admin.role === 'super-admin') {
    next();
  } else {
    res.status(403).json({ message: 'Super admin access required' });
  }
};

// Optional: Check if admin is active
export const isActive = async (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  if (req.admin.isActive) {
    next();
  } else {
    res.status(403).json({ message: 'Admin account is disabled. Please contact support.' });
  }
};

// Combine multiple middlewares
export const requireAdmin = [protect, admin, isActive];