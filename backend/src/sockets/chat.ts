import { Namespace, Socket } from 'socket.io';
import { messages, onlineUsersInfo } from './store';

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

	socket.on('update chat room name', ({ chatRoomId }) => {
		namespace.to(`chat-${chatRoomId}`).emit('refresh chat rooms');
	});

	socket.on('invite users', ({ chatRoomId, userList, teamId }) => {
		userList.forEach((user: { userId: number }) => {
			const onlineInvitedUser = Object.keys(onlineUsersInfo).find((socketId) => {
				return JSON.stringify(onlineUsersInfo[socketId]) === JSON.stringify({ teamId: teamId, userId: user.userId });
			});
			socket.to(onlineInvitedUser).emit('refresh chat rooms');
			socket.join(`chat-${chatRoomId}`);
		});
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
