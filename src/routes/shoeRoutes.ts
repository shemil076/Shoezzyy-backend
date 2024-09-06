import express from 'express';
import ShoeModel from '../models/Shoe'; // Adjust the path as necessary
import { getShoes, addShoe, getAllShoes, deleteShoe, updateIsTopPickByShoeId, updateShoePrice, updateShoeSizes, updateStringData } from '../controllers/shoeController';

const router = express.Router();

router.get('/:brand', getShoes);
router.post('/', addShoe); // Note: multer middleware is applied in server setup
router.get('/', getAllShoes);
router.delete('/:shoeId', deleteShoe);
router.put('/isATopPick', updateIsTopPickByShoeId);
router.put('/price',updateShoePrice);
router.put('/size',updateShoeSizes);
router.put('/stringData',updateStringData);

export default router;
