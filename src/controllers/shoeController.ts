import { Request, Response } from 'express';
import Shoe from '../models/Shoe';

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

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Shoe.distinct('brand');
    res.json(brands);
  } catch (error) {
    res.status(400).json({ message: 'Error creating shoe', error });
  }
};
