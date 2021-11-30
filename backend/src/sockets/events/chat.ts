import { Namespace, Socket } from 'socket.io';
import { chatEvents } from '../eventType';
import chatHandler from '@sockets/handlers/chat';

const initChat = (socket: Socket, namespace: Namespace) => {
	socket.on(chatEvents.ENTER_CHAT_PAGE, (data) => chatHandler.enterChatPage(socket, data));
	socket.on(chatEvents.ENTER_CHAT_ROOM, (data) => chatHandler.enterChatRoom(socket, data));
	socket.on(chatEvents.SEND_MESSAGE, (data) => chatHandler.sendMessage(socket, namespace, data));
	socket.on(chatEvents.CREATE_CHAT_ROOM, (data) => chatHandler.createChatRoom(socket, data));
	socket.on(chatEvents.INVITE_USERS, (data) => chatHandler.inviteUser(socket, namespace, data));
	socket.on(chatEvents.EXIT_CHAT_ROOM, (data) => chatHandler.leaveChatRoom(socket, data));
	socket.on(chatEvents.UPDATE_CHAT_ROOM_NAME, (data) => chatHandler.updateChatRoomName(socket, namespace, data));
};

export default initChat;
