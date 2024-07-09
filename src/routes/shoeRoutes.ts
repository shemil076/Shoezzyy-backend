import express from 'express';
import ShoeModel from '../models/Shoe'; // Adjust the path as necessary
import { getShoes, addShoe, getAllShoes, deleteShoe, updateIsTopPickByShoeId } from '../controllers/shoeController';

const router = express.Router();

router.get('/:brand', getShoes);

router.post('/', addShoe);
router.get('/',getAllShoes);
router.delete('/:shoeId',deleteShoe);
router.put('/isATopPick',updateIsTopPickByShoeId);


export default router;
