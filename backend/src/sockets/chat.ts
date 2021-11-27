import { Namespace, Socket } from 'socket.io';
import { onlineUsersInfo } from './store';
import Redis from '@redis/index';
import ChatRoomService from '@services/chat-room-service';

const initChat = (socket: Socket, namespace: Namespace) => {
	const redisClient = new Redis();

	socket.on('enter chat page', async ({ teamId, userId }) => {
		const { chat_rooms } = await ChatRoomService.getInstance().getChatRooms(teamId, userId);
		const chatRoomMessages = await Promise.all(
			chat_rooms.map(async ({ chat_room_id }) => getLastMessage(chat_room_id))
		);
		const chatRooms = chat_rooms.map((chatRoom) => {
			return {
				chatRoomId: chatRoom.chat_room_id,
				chatRoomName: chatRoom.chat_room_name,
				lastMessage: chatRoomMessages.find((message) => message.chatRoomId === chatRoom.chat_room_id)
			};
		});
		chatRooms.forEach(({ chatRoomId }) => {
			socket.join(`chat-${chatRoomId}`);
		});
		socket.emit('send chat rooms', { chatRooms });
	});

	socket.on('enter chat room', async ({ chatRoomId }) => {
		const { chat_room_users } = await ChatRoomService.getInstance().getChatRoomUsers(chatRoomId);
		const userList = userListSnakeToCamel(chat_room_users);
		const messageList = await redisClient.get('message', chatRoomId);
		socket.emit('receive chat room info', { chatRoomId, userList, messageList });
	});

	socket.on('send message', async (messageData: MessageReqType) => {
		const newMessage = await saveMessage(messageData, messageData.chatRoomId);
		namespace.to(`chat-${messageData.chatRoomId}`).emit('receive message', newMessage);
	});

	socket.on('create chat room', async ({ teamId, chatRoomName, userList, messageData }) => {
		const users = userListCamelToSnake(userList);
		const { chat_room_id, chat_room_name } = await ChatRoomService.getInstance().createChatRoom({
			team_id: teamId,
			chat_room_name: chatRoomName,
			user_list: users
		});
		const newMessage = await saveMessage({ ...messageData, chatRoomId: chat_room_id }, chat_room_id);
		joinSocketToChatRoom(userList, teamId, {
			chatRoomId: chat_room_id,
			chatRoomName: chat_room_name,
			lastMessage: newMessage
		});
	});

	socket.on('invite users', async ({ teamId, chatRoomId, userList }) => {
		const users = userListCamelToSnake(userList);
		await ChatRoomService.getInstance().addChatRoomUsers(chatRoomId, users);
		namespace.to(`chat-${chatRoomId}`).emit('join chat room', { chatRoomId, userList });

		const { chat_room } = await ChatRoomService.getInstance().getChatRoom(chatRoomId);
		const lastMessage = await getLastMessage(chatRoomId);
		joinSocketToChatRoom(userList, teamId, { chatRoomId, chatRoomName: chat_room.chat_room_name, lastMessage });
	});

	socket.on('exit chat room', async ({ chatRoomId, userId }) => {
		await ChatRoomService.getInstance().deleteChatRoomUser(chatRoomId, userId);
		socket.broadcast.to(`chat-${chatRoomId}`).emit('left chat room', { chatRoomId, userId });
		socket.leave(`chat-${chatRoomId}`);
	});

	socket.on('update chat room name', async ({ chatRoomId, chatRoomName }) => {
		await ChatRoomService.getInstance().updateChatRoomName(chatRoomId, chatRoomName);
		namespace.to(`chat-${chatRoomId}`).emit('updated chat room name', { chatRoomId, chatRoomName });
	});

	const saveMessage = async (messageData: MessageReqType, chatRoomId: number) => {
		const newMessage = await makeMessageObj(messageData);
		await redisClient.set('message', chatRoomId.toString(), newMessage);
		return newMessage;
	};
	const getLastMessage = async (chatRoomId: number) => {
		const messageList: any = await redisClient.get('message', chatRoomId.toString());
		return messageList[messageList.length - 1];
	};
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
const joinSocketToChatRoom = (
	userList: UserListType,
	teamId: number,
	chatRoom: { chatRoomId: number; chatRoomName: string; lastMessage: MessageType }
) => {
	userList.forEach((user) => {
		const onlineUserSocketId = Object.keys(onlineUsersInfo).find((socketId) => {
			return onlineUsersInfo[socketId].userId === user.userId && onlineUsersInfo[socketId].teamId === teamId;
		});
		if (onlineUserSocketId && onlineUsersInfo[onlineUserSocketId].socket) {
			onlineUsersInfo[onlineUserSocketId].socket.join(`chat-${chatRoom.chatRoomId}`);
			onlineUsersInfo[onlineUserSocketId].socket.emit('invited to chat room', chatRoom);
		}
	});
};
const userListCamelToSnake = (userList: UserListType) => {
	return userList.map((user) => {
		return { user_id: user.userId };
	});
};
const userListSnakeToCamel = (userList: { user_id: number }[]) => {
	return userList.map((user) => {
		return { userId: user.user_id };
	});
};

export type UserListType = { userId: number }[];
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
