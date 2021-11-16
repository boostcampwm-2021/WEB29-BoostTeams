import express from 'express';
import ChatController from '@controllers/chat-controller';

const router = express.Router();

router.post('/room', ChatController.createChatRoom);

export default router;
