import { Router } from 'express';
import { getShoes, addShoe } from '../controllers/shoeController';

const router = Router();

router.get('/:brand', getShoes);
router.post('/', addShoe);

export default router;
