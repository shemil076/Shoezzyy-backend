import { Router } from "express";
import { signIn } from "../controllers/adminController";


const router = Router();

router.post('/', signIn);

export default router;