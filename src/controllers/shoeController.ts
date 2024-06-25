import { Request, Response } from 'express';
import Shoe from '../models/Shoe';

export const getShoes = async (req: Request, res: Response) => {
  const { category } = req.params;
  const shoes = await Shoe.find({ category });
  res.json(shoes);
};

export const addShoe = async (req: Request, res: Response) => {
  const { name, category } = req.body;
  const newShoe = new Shoe({ name, category });
  await newShoe.save();
  res.status(201).json(newShoe);
};
