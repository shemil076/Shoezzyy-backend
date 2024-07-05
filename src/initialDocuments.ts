import OrderModel from './models/Order';
import AdminModel from './models/Admin';
import ShoeModel from './models/Shoe';
import mongoose from 'mongoose';
import { Brand } from './types/enum';

async function createInitialDocuments() {

  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    if (!collectionNames.includes('orders')) {
      await OrderModel.create({
        jobId: 1,
        customerName: 'John Doe',
        shoeId: new mongoose.Types.ObjectId("60d5ec49f06c0b5c481d1183"),
        status: 'pending'
      });
    }

    if (!collectionNames.includes('admins')) {
      await AdminModel.create({
        username: 'admin',
        password: 'password'
      });
    }

    if (!collectionNames.includes('shoes')) {
      await ShoeModel.create({
        brand: Brand.Nike,
        color: 'Red',
        price: 100,
        name: 'Air',
        images : [""]
      });
    }

    console.log('Initial documents created if collections were missing');
  } catch (err) {
    console.error('Error creating initial documents:', err);
  }
}

export default createInitialDocuments;
