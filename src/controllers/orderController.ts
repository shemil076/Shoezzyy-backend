import { Request, Response } from 'express';
import Order from '../models/Order';
import { v4 as uuidv4 } from 'uuid';

export const createOrder = async (req: Request, res: Response) => {
  const {jobId,shoeId, shoeBrand, shoeName,quantity ,cost,status} = req.body;

  try{
    const order = new Order({
      jobId,
      shoeId,
      shoeBrand,
      shoeName,
      quantity,
      cost,
      status
    });

    await order.save();
    res.status(201).json(order);
  } catch(error){
    console.log('Error creating order', error);
    res.status(400).json({messsage : 'Error creating order', error});
  }
};

export const getOrderStatus = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const order = await Order.findOne({ jobId }).populate('shoeId');
  res.json(order);
};

export const getAllOrders = async (req: Request, res: Response) =>{
  try{
    const order = await Order.find();
    res.json(order);
  }catch (error){
    console.log('Ran into an issue', error);
    res.status(400).json({message : 'Error when fetching orders', error});
  }
};

export const getOrderById = async (req: Request, res: Response) =>{
  const {jobId} = req.params;
  try{
    const order = await Order.find({jobId});
    res.json(order);
  }catch (error){
    console.error('Error occurred when fetch order',error);
  }
};

export const updateOrderStatus = async (req :Request, res :Response) =>{
  const {_id, status} = req.body;
  try{
    const updatedOrder = await Order.findByIdAndUpdate(
      {_id},
      {status},
      { new: true }
    );

    if(!updatedOrder) return res.status(404).json({message : 'Order not found'});

    res.status(200).json(updatedOrder);
  }catch(error){
    console.error('Error occurred while updating order status', error);
    res.status(400).json({message: 'Error occurred while updating order status', error});
  }
};