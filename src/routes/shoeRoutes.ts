import express from 'express';
import ShoeModel from '../models/Shoe'; // Adjust the path as necessary
import { getShoes, addShoe, getBrands } from '../controllers/shoeController';

const router = express.Router();

router.get('/:brand', getShoes);
// Endpoint to create a new shoe
router.post('/', addShoe);
router.get('/brand',getBrands);

export default router;
