import express from 'express';
import multer from 'multer';
import connectDB from './db';
import createInitialDocuments from './initialDocuments';
import orderRoutes from './routes/orderRoutes';
import shoeRoutes from './routes/shoeRoutes';
import adminRouters from './routes/adminAuth';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const newFilename = `${basename}-${Date.now()}${ext}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/brand/uploads', express.static(path.resolve('uploads')));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/shoes', upload.array('images', 4), shoeRoutes); // Apply multer middleware to shoeRoutes
app.use('/api/admin', adminRouters);

// Start server and connect to DB
app.listen(port, '0.0.0.0', async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
  await createInitialDocuments();
});

export default app;
