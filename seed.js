import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding');

    const defaultEmail = 'admin@consultancypro.com';
    const defaultPassword = 'admin123';
    
    // Check if default admin exists
    const existingAdmin = await Admin.findOne({ email: defaultEmail });
    if (existingAdmin) {
      console.log('⚠️  Default admin already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: defaultEmail,
      password: defaultPassword
    });

    console.log('✅ Default Admin Created Successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('🌐 Login: http://localhost:5173/admin/login');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();

