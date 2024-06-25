import { Request, Response } from 'express';
import Order from '../models/Order';
import { v4 as uuidv4 } from 'uuid';

export const createOrder = async (req: Request, res: Response) => {
  const { shoeId } = req.body;
  const jobId = uuidv4();
  const newOrder = new Order({ jobId, shoeId });
  await newOrder.save();
  res.status(201).json({ jobId });
};

export const getOrderStatus = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const order = await Order.findOne({ jobId }).populate('shoeId');
  res.json(order);
};
