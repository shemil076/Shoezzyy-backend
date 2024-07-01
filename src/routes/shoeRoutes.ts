import express from 'express';
import ShoeModel from '../models/Shoe'; // Adjust the path as necessary
import { getShoes, addShoe, getAllShoes, deleteShoe } from '../controllers/shoeController';

const router = express.Router();

router.get('/:brand', getShoes);

router.post('/', addShoe);
router.get('/',getAllShoes);
router.delete('/:shoeId',deleteShoe);


export default router;
