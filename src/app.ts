import express from 'express';
import connectDB from './db';
import createInitialDocuments from './initialDocuments';
import orderRoutes from './routes/orderRoutes';
import shoeRoutes from './routes/shoeRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/shoes', shoeRoutes);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
  await createInitialDocuments();
});
