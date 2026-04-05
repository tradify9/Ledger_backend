import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import servicesRoutes from './routes/services.js';
import blogsRoutes from './routes/blogs.js';
import contactsRoutes from './routes/contacts.js';
import siteSettingsRoutes from './routes/siteSettings.js';
import aboutRoutes from './routes/about.js';
import privacyRoutes from './routes/privacy.js';
import homeRoutes from './routes/home.js';
import contactDetailsRoutes from './routes/contactDetails.js';
import dashboardRoutes from './routes/dashboard.js';
import footerRoutes from './routes/footer.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ 
  origin: ['http://localhost:5173', 'https://palegreen-echidna-749052.hostingersite.com','https://ledgeradvisory.in'], 
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import fs from 'node:fs';
import path from 'node:path';
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads', { recursive: true });
  console.log('📁 Created uploads/ directory');
}

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Consultancy Backend API Running!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', message: 'Backend is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/contact-details', contactDetailsRoutes);
app.use('/api/footer', footerRoutes);

app.use('/api/admin/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Mongo Error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
