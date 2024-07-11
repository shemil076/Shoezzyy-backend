import { Request, Response } from 'express';
import  Admin  from '../models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const jwtSecret = process.env.JWT_SECRET || 'shoe.zzyy_dev_env_jwt_secret';
      const token = jwt.sign({ id: admin._id, role: admin.role }, jwtSecret, { expiresIn: '2h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error in signIn:', error);
  
      // Narrowing down the type of 'error'
      if (error instanceof Error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
      }
    }
  };