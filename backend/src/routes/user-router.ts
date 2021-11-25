import express from 'express';
import UserController from '@controllers/user-controller';
import { authenticateToken } from '@middlewares/token';

const router = express.Router();

router.patch('/', authenticateToken, UserController.updateUser);

export default router;
