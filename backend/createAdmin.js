import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin already exists.');
      process.exit();
    }

    // ✅ Correct hashing with await — NO CALLBACK
    const hashedPassword = await bcrypt.hash('123456', 10);

    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error while creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
