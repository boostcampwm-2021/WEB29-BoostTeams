import { Namespace, Socket } from 'socket.io';
import { onlineUsersInfo } from './store';
import { chatEvents } from './eventType';
import Redis from '@redis/index';

const initChat = (socket: Socket, namespace: Namespace) => {
	const redisClient = new Redis();

	socket.on(chatEvents.ENTER_CHAT_ROOMS, async ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			socket.join(`chat-${chatRoomId}`);
		});
		const chatRoomMessages = await Promise.all(
			chatRooms.map(async ({ chatRoomId }) => redisClient.get('message', chatRoomId.toString()))
		);
		const lastMessages = {};
		chatRoomMessages.forEach((messages: MessageType[]) => {
			if (messages.length !== 0) {
				const lastMessage = messages[messages.length - 1];
				lastMessages[lastMessage.chatRoomId] = lastMessage;
			}
		});
		socket.emit(chatEvents.RECEIVE_LAST_MESSAGES, lastMessages);
	});

	socket.on(chatEvents.LEAVE_CHAT_ROOMS, ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			socket.leave(`chat-${chatRoomId}`);
		});
	});

	socket.on(chatEvents.GET_MESSAGE_LIST, async ({ chatRoomId }) => {
		const messageList = await redisClient.get('message', chatRoomId);
		socket.emit(chatEvents.RECEIVE_MESSAGE_LIST, { chatRoomId, messageList });
	});

	socket.on(chatEvents.SEND_MESSAGE, async (messageData: MessageReqType) => {
		const chatRoomId = messageData.chatRoomId.toString();
		const newMessage = await makeMessageObj(messageData);
		await redisClient.set('message', chatRoomId, newMessage);
		namespace.in(`chat-${messageData.chatRoomId}`).emit(chatEvents.RECEIVE_MESSAGE, newMessage);
	});

	socket.on(chatEvents.UPDATE_CHAT_ROOM_NAME, ({ chatRoomId }) => {
		namespace.to(`chat-${chatRoomId}`).emit(chatEvents.REFRESH_CHAT_ROOMS);
	});

	socket.on(chatEvents.CREATE_CHAT_ROOM, ({ chatRoomId, userList, teamId }) => {
		socket.join(`chat-${chatRoomId}`);
		userList.forEach((user: { userId: number }) => {
			const onlineInvitedUser = Object.keys(onlineUsersInfo).find((socketId) => {
				return onlineUsersInfo[socketId].userId === user.userId && onlineUsersInfo[socketId].teamId === teamId;
			});
			if (onlineUsersInfo[onlineInvitedUser] && onlineUsersInfo[onlineInvitedUser].socket) {
				onlineUsersInfo[onlineInvitedUser].socket.join(`chat-${chatRoomId}`);
				socket.to(onlineInvitedUser).emit(chatEvents.REFRESH_CHAT_ROOMS);
			}
		});
	});

	// 초대받은 사람들 chat room users refresh
	socket.on('invite users', ({ chatRoomId, userList, teamId }) => {
		userList.forEach((user: { userId: number }) => {
			const onlineInvitedUser = Object.keys(onlineUsersInfo).find((socketId) => {
				return onlineUsersInfo[socketId].userId === user.userId && onlineUsersInfo[socketId].teamId === teamId;
			});
			if (onlineUsersInfo[onlineInvitedUser] && onlineUsersInfo[onlineInvitedUser].socket) {
				onlineUsersInfo[onlineInvitedUser].socket.join(`chat-${chatRoomId}`);
				socket.to(onlineInvitedUser).emit(chatEvents.REFRESH_CHAT_ROOMS);
			}
		});
		namespace.to(`chat-${chatRoomId}`).emit(chatEvents.REFRESH_CHAT_ROOM_USERS, { chatRoomId });
	});

	socket.on('exit chat room', ({ chatRoomId }) => {
		namespace.to(`chat-${chatRoomId}`).emit(chatEvents.REFRESH_CHAT_ROOM_USERS, { chatRoomId });
		socket.leave(`chat-${chatRoomId}`);
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
