import express from 'express';
import multer from 'multer';
import connectDB from './db';
import createInitialDocuments from './initialDocuments';
import orderRoutes from './routes/orderRoutes';
import shoeRoutes from './routes/shoeRoutes';
import adminRouters from './routes/adminAuth'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// const port = process.env.PORT || 5000;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;


// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' }); // You can configure the destination and storage options

// Middleware to parse JSON bodies with increased limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/shoes', upload.array('images'), shoeRoutes); // Apply multer middleware to shoeRoutes
app.use('/api/shoes', shoeRoutes);
app.use('/api/admin', adminRouters);


// Start server and connect to DB
// app.listen(port, async () => {
//   console.log(`Server is running on http://localhost:${port}`);
//   await connectDB();
//   await createInitialDocuments();
// });

app.listen(port, '0.0.0.0', async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
  await createInitialDocuments();
});

export default app;
