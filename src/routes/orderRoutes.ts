import { Router } from 'express';
import { createOrder, getOrderStatus } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/:jobId', getOrderStatus);

export default router;
