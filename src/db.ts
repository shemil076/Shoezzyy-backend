import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/shoezzyy';

async function connectDB() {
  try {
    await mongoose.connect(uri, {
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export default connectDB;
