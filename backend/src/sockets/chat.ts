import { Namespace, Socket } from 'socket.io';
import { messages } from './store';

// eslint-disable-next-line prefer-const
let messageIdx = 1;

const saveMessage = (chatRoomId, message: MessageType) => {
	if (!messages[chatRoomId]) messages[chatRoomId] = [message];
	else messages[chatRoomId].push(message);
};

const initChat = (socket: Socket, namespace: Namespace) => {
	socket.on('enter chat rooms', ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			//console.log(`join chat-${chatRoomId}`);
			socket.join(`chat-${chatRoomId}`);
		});
	});

	socket.on('leave chat rooms', ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			//console.log(`leave chat-${chatRoomId}`);
			socket.leave(`chat-${chatRoomId}`);
		});
	});

	socket.on('send message', ({ content, userId, chatRoomId }) => {
		const message = { messageId: (messageIdx += 1), content, createdAt: new Date(), userId, chatRoomId };
		saveMessage(chatRoomId, message);
		namespace.in(`chat-${chatRoomId}`).emit('receive message', message);
	});
};

export interface MessageType {
	messageId: number;
	content: string;
	createdAt: Date;
	userId: number;
	chatRoomId: number;
}

export default initChat;
