import mongoose from 'mongoose';

async function createInitialCollections() {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    // Create collections if they don't exist
    if (!collectionNames.includes('orders')) {
      await mongoose.connection.createCollection('orders');
    }

    if (!collectionNames.includes('admins')) {
      await mongoose.connection.createCollection('admins');
    }

    if (!collectionNames.includes('shoes')) {
      await mongoose.connection.createCollection('shoes');
    }

    console.log('Initial collections created if they were missing');
  } catch (err) {
    console.error('Error creating initial collections:', err);
  }
}

export default createInitialCollections;
