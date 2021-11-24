import { Namespace, Socket } from 'socket.io';
import { onlineUsersInfo } from './store';
import Redis from '@redis/index';

const initChat = (socket: Socket, namespace: Namespace) => {
	const redisClient = new Redis();

	socket.on('enter chat rooms', ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			socket.join(`chat-${chatRoomId}`);
			// console.log(`join chat-${chatRoomId} ${socket.id}`);
		});
	});

	socket.on('leave chat rooms', ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			socket.leave(`chat-${chatRoomId}`);
			// console.log(`leave chat-${chatRoomId} ${socket.id}`);
		});
	});

	socket.on('get message list', async ({ chatRoomId }) => {
		// console.log('get message list', chatRoomId);
		const messageList = await redisClient.get('message', chatRoomId);
		socket.emit('receive message list', { chatRoomId, messageList });
	});

	socket.on('get last messages', async ({ chatRoomList }: { chatRoomList: { chatRoomId: number }[] }) => {
		const chatRoomMessages = await Promise.all(
			chatRoomList.map(async ({ chatRoomId }) => redisClient.get('message', chatRoomId.toString()))
		);
		const lastMessages = {};
		chatRoomMessages.forEach((messages: MessageType[]) => {
			if (messages.length !== 0) {
				const lastMessage = messages[messages.length - 1];
				lastMessages[lastMessage.chatRoomId] = lastMessage;
			}
		});
		socket.emit('receive last messages', lastMessages);
	});

	socket.on('send message', async (messageData: MessageReqType) => {
		const chatRoomId = messageData.chatRoomId.toString();
		const newMessage = await makeMessageObj(messageData);
		await redisClient.set('message', chatRoomId, newMessage);
		namespace.in(`chat-${messageData.chatRoomId}`).emit('receive message', newMessage);
	});

	socket.on('update chat room name', ({ chatRoomId }) => {
		namespace.to(`chat-${chatRoomId}`).emit('refresh chat rooms');
	});

	socket.on('create chat room', ({ chatRoomId, userList, teamId }) => {
		socket.join(`chat-${chatRoomId}`);
		userList.forEach((user: { userId: number }) => {
			const onlineInvitedUser = Object.keys(onlineUsersInfo).find((socketId) => {
				return onlineUsersInfo[socketId].userId === user.userId && onlineUsersInfo[socketId].teamId === teamId;
			});
			onlineUsersInfo[onlineInvitedUser].socket.join(`chat-${chatRoomId}`);
			// console.log(`join chat-${chatRoomId} ${onlineInvitedUser}`);
			socket.to(onlineInvitedUser).emit('refresh chat rooms');
		});
	});

	socket.on('invite users', ({ chatRoomId, userList, teamId }) => {
		userList.forEach((user: { userId: number }) => {
			const onlineInvitedUser = Object.keys(onlineUsersInfo).find((socketId) => {
				return onlineUsersInfo[socketId].userId === user.userId && onlineUsersInfo[socketId].teamId === teamId;
			});
			onlineUsersInfo[onlineInvitedUser].socket.join(`chat-${chatRoomId}`);
			// console.log(`join chat-${chatRoomId} ${onlineInvitedUser}`);
			socket.to(onlineInvitedUser).emit('refresh chat rooms');
		});
	});

	socket.on('exit chat room', ({ chatRoomId }) => {
		namespace.to(`chat-${chatRoomId}`).emit('refresh chat room users', { chatRoomId });
		socket.leave(`chat-${chatRoomId}`);
		// console.log(`leave chat-${chatRoomId} ${socket.id}`);
	});
};

const makeMessageObj = async (messageData: MessageReqType) => {
	const id = await Redis.getNextId('message');
	return {
		messageId: id,
		content: messageData.content,
		createdAt: new Date(),
		userId: messageData.userId,
		chatRoomId: messageData.chatRoomId
	};
};

export interface MessageReqType {
	content: string;
	userId: number;
	chatRoomId: number;
}

export interface MessageType {
	messageId: number;
	content: string;
	createdAt: Date;
	userId: number;
	chatRoomId: number;
}

export default initChat;
