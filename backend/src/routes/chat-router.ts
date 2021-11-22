import express from 'express';
import ChatController from '@controllers/chat-controller';

const router = express.Router();

router.post('/room', ChatController.createChatRoom);
router.get('/room', ChatController.getChatRooms);
router.get('/room/:chatRoomId', ChatController.getChatRoomUsers);

export default router;
