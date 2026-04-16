import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin exists' });
    
    const admin = await Admin.create({ name, email, password });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '365d' });
    
    res.status(201).json({ token, admin: { id: admin._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = (req, res) => {
  res.json({ admin: req.admin });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '365d' });
    res.json({ token, admin: { id: admin._id, name: admin.name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // Update name and email if provided
    if (req.body.name) admin.name = req.body.name;
    if (req.body.email) {
      const existing = await Admin.findOne({ email: req.body.email });
      if (existing && existing._id.toString() !== admin._id.toString()) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      admin.email = req.body.email;
    }

    // Update password if provided
    if (req.body.password) {
      admin.password = await bcrypt.hash(req.body.password, 12);
    }

    const updatedAdmin = await admin.save();
    const token = jwt.sign({ id: updatedAdmin._id }, process.env.JWT_SECRET, { expiresIn: '365d' });

    res.json({ 
      token, 
      admin: { id: updatedAdmin._id, name: updatedAdmin.name, email: updatedAdmin.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

