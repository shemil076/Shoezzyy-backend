import { Router } from 'express';
import { createOrder, getOrderById, getOrderStatus, getAllOrders, updateOrderStatus } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/',getAllOrders);
router.get('/:jobId', getOrderById);
router.put('/status', updateOrderStatus);

export default router;
