import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding');

    // 👇 Multiple admins array
    const admins = [
      {
        name: 'Super Admin',
        email: 'admin@consultancypro.com',
        password: 'admin123'
      },
      {
        name: 'Manager Admin',
        email: 'sbi@gmail.com',
        password: 'admin123'
      }
    ];

    for (const adminData of admins) {
      const existingAdmin = await Admin.findOne({ email: adminData.email });

      if (existingAdmin) {
        console.log(`⚠️ Admin already exists: ${adminData.email}`);
        continue;
      }

      const newAdmin = await Admin.create(adminData);

      console.log('✅ Admin Created:', newAdmin.email);
    }

    console.log('\n🎉 Seeding Completed!');
    console.log('🌐 Login URL: http://localhost:5173/admin/login');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedAdmins();
await import('./seedAbout.js');
