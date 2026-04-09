import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/srilanka_day_planner';

// Track MongoDB connection status
let mongoConnected = false;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected successfully');
    mongoConnected = true;

    // Seed default admin user if not exists
    const User = (await import('../models/User.js')).default;
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      const bcrypt = (await import('bcryptjs')).default;
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@dreamtourist.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Default admin user created: admin@dreamtourist.com / admin123');
    }

    return true;
  } catch (error) {
    console.warn('MongoDB connection failed, running in development mode:', error.message);
    mongoConnected = false;
    return false;
  }
};

export const isMongoConnected = () => mongoConnected;