import { Request, Response } from 'express';
import Shoe from '../models/Shoe';

export const getShoes = async (req: Request, res: Response) => {
  const { brand } = req.params;
  const shoes = await Shoe.find({ brand });
  res.json(shoes);
};

export const addShoe = async (req: Request, res: Response) => {
  const { name, brand } = req.body;
  const newShoe = new Shoe({ name, brand });
  await newShoe.save();
  res.status(201).json(newShoe);
};
