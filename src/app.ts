import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;

const uri = 'mongodb://localhost:27017/shoezzyy';

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Define the Orders schema and model
interface Order extends Document {
  jobId: string;
  customerName: string;
  shoeId: string;
  status: string;
}

const orderSchema: Schema = new Schema({
  jobId: { type: String, required: true },
  customerName: { type: String, required: true },
  shoeId: { type: String, required: true },
  status: { type: String, required: true }
});

const OrderModel = mongoose.model<Order>('Order', orderSchema);

// Define the Admin schema and model
interface Admin extends Document {
  username: string;
  password: string;
}

const adminSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const AdminModel = mongoose.model<Admin>('Admin', adminSchema);

// Define the Shoes schema and model
interface Shoe extends Document {
  brand: string;
  size: number;
  color: string;
  price: number;
  category: string;
}

const shoeSchema: Schema = new Schema({
  brand: { type: String, required: true },
  size: { type: Number, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

const ShoeModel = mongoose.model<Shoe>('Shoe', shoeSchema);

async function createInitialDocuments() {
  try {
    await connectDB();

    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    if (!collectionNames.includes('orders')) {
      await OrderModel.create({
        jobId: '1',
        customerName: 'John Doe',
        shoeId: '1',
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
        brand: 'Nike',
        size: 42,
        color: 'Red',
        price: 100,
        category: 'men'
      });
    }

    console.log('Initial documents created if collections were missing');
  } catch (err) {
    console.error('Error creating initial documents:', err);
  }
}

// app.get('/', (req: Request, res: Response) => {
//   // res.send('Hello, world!');
// });

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await createInitialDocuments();
});
