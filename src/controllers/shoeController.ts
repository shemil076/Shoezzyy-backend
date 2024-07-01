import { Request, Response } from 'express';
import Shoe from '../models/Shoe';
import mongoose from 'mongoose';

export const getShoes = async (req: Request, res: Response) => {
  const { brand } = req.params;
  const shoes = await Shoe.find({ brand });
  res.json(shoes);
};

export const addShoe = async (req: Request, res: Response) => {
  const { name, brand, price, description, images } = req.body;

  try {
      const shoe = new Shoe({
          name,
          brand,
          price,
          description,
          images
      });

      await shoe.save();
      res.status(201).json(shoe);
  } catch (error) {
      console.error('Error creating shoe:', error);
      res.status(400).json({ message: 'Error creating shoe', error });
  }
};

export const getAllShoes = async (req: Request, res: Response) => {
  try {
    const brands = await Shoe.find();
    res.json(brands);
  } catch (error) {
    res.status(400).json({ message: 'Error creating shoe', error });
  }
};

export const deleteShoe = async (req: Request, res: Response) => {
  const shoeId = req.params.shoeId;

  if(!mongoose.Types.ObjectId.isValid(shoeId)){
    console.log('Invalid shoe Id',{shoeId})
    return res.status(400).json({message : 'Invalid shoe Id'});
  }
  try{
    const shoe = await Shoe.findByIdAndDelete(shoeId);

    if (!shoe){
      return res.status(404).json({message : 'Shoe not found'});
    }
    res.status(200).json({message: 'Shoe deleted successfully'});
  }catch(error){
    console.log('Error deleting shoe',error);
    res.status(400).json({message: 'Error deteleting shoe', error});
  }
};