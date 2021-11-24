import express from 'express';
import ChatController from '@controllers/chat-controller';

const router = express.Router();

router.post('/rooms', ChatController.createChatRoom);
router.get('/rooms', ChatController.getChatRooms);
router.patch('/rooms/:chatRoomId', ChatController.updateChatRoomName);

router.get('/rooms/:chatRoomId/users', ChatController.getChatRoomUsers);
router.post('/rooms/:chatRoomId/users', ChatController.addChatRoomUsers);
router.delete('/rooms/:chatRoomId/users/:userId', ChatController.deleteChatRoomUser);

export default router;
