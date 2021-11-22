import express from 'express';
import ChatController from '@controllers/chat-controller';

const router = express.Router();

router.post('/rooms', ChatController.createChatRoom);
router.get('/rooms', ChatController.getChatRooms);
router.get('/rooms/:chatRoomId', ChatController.getChatRoomUsers);
router.patch('/rooms/:chatRoomId', ChatController.updateChatRoomName);

router.get('/messages', ChatController.getChatMessages);

export default router;
