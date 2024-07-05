import express from 'express';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

router.get('/dashboard', adminAuth, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
});

export default router;