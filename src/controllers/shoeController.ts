import { Request, Response } from 'express';
import Shoe from '../models/Shoe';
import mongoose from 'mongoose';

export const getShoes = async (req: Request, res: Response) => {
  const { brand } = req.params;
  const shoes = await Shoe.find({ brand });
  res.json(shoes);
};

export const addShoe = async (req: Request, res: Response) => {
  const { name, brand, description, images, actualPrice, offerPrice, isATopPick, type } = req.body;

  try {
      // Ensure type is only added if it exists in the request body
      const shoe = new Shoe ({
          name,
          brand,
          actualPrice,
          offerPrice,
          description,
          images,
          isATopPick
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
    const brands = await Shoe.find().sort({ createdAt: -1 });
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

export const updateIsTopPickByShoeId = async (req :Request, res : Response) =>{
  const {_id, isATopPick} = req.body;

  console.log("_id",_id);
  console.log("isATopPick",isATopPick);

  try{
    const updatedIsTopPickShoe =  await Shoe.findByIdAndUpdate(
      {_id},
      {isATopPick},
      {new: true}
    );
    if(!updatedIsTopPickShoe) return res.status(404).json({message : 'Shoe not found'});
    res.status(200).json(updatedIsTopPickShoe);
  }catch(error){
    console.error('Error occurred while updating shoe', error);
    res.status(400).json({message: 'Error occurred while updating shoe', error});
  }
};