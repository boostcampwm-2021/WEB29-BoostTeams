import express from 'express';
import UserController from '../controllers/user-controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUser);
