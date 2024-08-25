import { Request, Response } from 'express';
import Shoe from '../models/Shoe';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

export const getShoes = async (req: Request, res: Response) => {
  const { brand } = req.params;
  const shoes = await Shoe.find({ brand });
  res.json(shoes);
};

export const addShoe = async (req: Request, res: Response) => {
  const { name, brand, description, actualPrice, offerPrice, isATopPick, model, sizeUrl, maxSize, minSize } = req.body;

  try {
    // Extract image file paths from req.files
    const images = (req.files as Express.Multer.File[]).map(file => file.path);

    var maximumSize = parseInt(maxSize);
    var minimumSize = parseInt(minSize);


    const shoe = new Shoe({
      name,
      brand,
      actualPrice,
      offerPrice,
      description,
      images,
      isATopPick,
      model,
      sizeUrl,
      maximumSize,
      minimumSize
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
    res.status(400).json({ message: 'Error fetching shoes', error });
  }
};

export const deleteShoe = async (req: Request, res: Response) => {
  const shoeId = req.params.shoeId;

  if (!mongoose.Types.ObjectId.isValid(shoeId)) {
    return res.status(400).json({ message: 'Invalid shoe Id' });
  }

  try {
    const shoe = await Shoe.findByIdAndDelete(shoeId);

    if (!shoe){
      return res.status(404).json({message : 'Shoe not found'});
    }

    shoe.images.forEach((imagePath: string) => {
      const fullPath = path.resolve(imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Error deleting image file ${fullPath}:`, err);
        }
      });
    });

    res.status(200).json({message: 'Shoe deleted successfully' });
  }catch(error){
    console.error('Error deleting shoe', error);
    res.status(400).json({ message: 'Error deleting shoe', error });
  }
};

export const updateIsTopPickByShoeId = async (req: Request, res: Response) => {
  const { _id, isATopPick } = req.body;

  try {
    const updatedIsTopPickShoe = await Shoe.findByIdAndUpdate(
      _id,
      { isATopPick },
      { new: true }
    );

    if (!updatedIsTopPickShoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json(updatedIsTopPickShoe);
  } catch (error) {
    console.error('Error updating shoe as a top pick', error);
    res.status(400).json({ message: 'Error updating shoe as a top pick', error });
  }
};

export const updateShoePrice = async (req: Request, res: Response) =>{
  const {_id, actualPrice, offerPrice} = req.body;

  try{
    const updatedPrice = await Shoe.findByIdAndUpdate(
      _id,
      {actualPrice,offerPrice},
      {new : true}
    )

    if(!updatedPrice) return res.status(404).json({ message: 'shoe not found and failed to update the price' });

    res.status(200).json(updatedPrice);
  }catch (error){
    console.error('Error updating shoe price', error);
    res.status(400).json({ message: 'Error updating shoe price', error });
  }
};

export const updateShoeSizes = async(req: Request, res: Response) =>{
  const {_id, minimumSize, maximumSize} = req.body;

  try{
    const updatedShoe = await Shoe.findByIdAndUpdate(
      _id,
      {maximumSize,minimumSize},
      {new : true}
    )

    if(!updatedShoe) return res.status(404).json({message: 'Shoe not found and failed to updated the size'});

    res.status(200).json(updatedShoe);
  }catch (error){
    console.error('Error updating shoe size', error);
    res.status(400).json({ message: 'Error updating shoe size', error });
  }
}