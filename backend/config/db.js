const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB is connected successfully');
    console.log(`📍 Connected to: ${conn.connection.host}:${conn.connection.port}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('🔍 Check if MongoDB is running and the connection string is correct');
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
