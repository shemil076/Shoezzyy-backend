import { Router } from 'express';
import { getShoes, addShoe } from '../controllers/shoeController';

const router = Router();

router.get('/:category', getShoes);
router.post('/', addShoe);

export default router;
