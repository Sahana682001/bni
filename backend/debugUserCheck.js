import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // Adjust if your path is different

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ Connected to DB:', mongoose.connection.name);

    const allUsers = await User.find({});
    console.log('📋 All users:', allUsers);

    const user = await User.findOne({ email: 'admin@example.com' });
    console.log('🔎 Direct match:', user);

    const regexMatch = await User.findOne({ email: { $regex: /^admin@example\.com$/, $options: 'i' } });
    console.log('🔍 Regex match:', regexMatch);

    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

run();
