import { Namespace, Socket } from 'socket.io';
import { onlineUsersInfo } from '../store';
import ChatRoomService from '@services/chat-room-service';
import MessageService from '@services/message-service';
import { chatEvents } from '../eventType';
import {
	UserListType,
	ChatRoomLastMessageType,
	EnterChatPageReqType,
	EnterChatRoomReqType,
	MessageReqType,
	CreateChatRoomReqType,
	InviteUserReqType,
	LeaveChatRoomReqType,
	UpdateChatRoomNameReqType
} from '@src/customeTypes/chat';

const chatHandler = {
	enterChatPage: async (socket: Socket, { teamId, userId }: EnterChatPageReqType) => {
		try {
			const { chat_rooms } = await ChatRoomService.getInstance().getChatRooms(teamId, userId);
			const chatRooms = await MessageService.getChatRoomsLastMessage(chat_rooms);
			chatRooms.forEach(({ chatRoomId }) => {
				socket.join(`chat-${chatRoomId}`);
			});
			socket.emit(chatEvents.RECEIVE_CHAT_ROOMS_INFO, { chatRooms });
		} catch (err) {
			socket.emit(chatEvents.ERROR.TYPE, chatEvents.ERROR.MESSAGES.LOAD);
		}
	},
	enterChatRoom: async (socket: Socket, { chatRoomId }: EnterChatRoomReqType) => {
		try {
			const { chat_room_users } = await ChatRoomService.getInstance().getChatRoomUsers(chatRoomId);
			const messageList = await MessageService.getMessageList(chatRoomId);
			const userList = userListSnakeToCamel(chat_room_users);
			socket.emit(chatEvents.RECEIVE_CHAT_ROOM_INFO, { chatRoomId, userList, messageList });
		} catch (err) {
			socket.emit(chatEvents.ERROR.TYPE, chatEvents.ERROR.MESSAGES.ENTER);
		}
	},
	sendMessage: async (socket: Socket, namespace: Namespace, messageData: MessageReqType) => {
		try {
			const newMessage = await MessageService.saveMessage(messageData, messageData.chatRoomId);
			namespace.to(`chat-${messageData.chatRoomId}`).emit(chatEvents.RECEIVE_MESSAGE, newMessage);
		} catch (err) {
			socket.emit(chatEvents.ERROR.TYPE, chatEvents.ERROR.MESSAGES.SEND);
		}
	},
	createChatRoom: async (socket: Socket, { teamId, chatRoomName, userList, messageData }: CreateChatRoomReqType) => {
		try {
			const users = userListCamelToSnake(userList);
			const { chat_room_id, chat_room_name } = await ChatRoomService.getInstance().createChatRoom({
				team_id: teamId,
				chat_room_name: chatRoomName,
				user_list: users
			});
			const newMessage = await MessageService.saveMessage({ ...messageData, chatRoomId: chat_room_id }, chat_room_id);
			joinSocketToChatRoom(userList, teamId, {
				chatRoomId: chat_room_id,
				chatRoomName: chat_room_name,
				lastMessage: newMessage
			});
		} catch (err) {
			socket.emit(chatEvents.ERROR.TYPE, chatEvents.ERROR.MESSAGES.CREATE);
		}
	},
	inviteUser: async (socket: Socket, namespace: Namespace, { teamId, chatRoomId, userList }: InviteUserReqType) => {
		try {
			const users = userListCamelToSnake(userList);
			await ChatRoomService.getInstance().addChatRoomUsers(chatRoomId, users);
			namespace.to(`chat-${chatRoomId}`).emit(chatEvents.JOIN_CHAT_ROOM, { chatRoomId, userList });

			const { chat_room } = await ChatRoomService.getInstance().getChatRoom(chatRoomId);
			const lastMessage = await MessageService.getLastMessage(chatRoomId);
			joinSocketToChatRoom(userList, teamId, { chatRoomId, chatRoomName: chat_room.chat_room_name, lastMessage });
		} catch (err) {
			socket.emit(chatEvents.ERROR.TYPE, chatEvents.ERROR.MESSAGES.INVITE);
		}
	},
	leaveChatRoom: async (socket: Socket, { chatRoomId, userId }: LeaveChatRoomReqType) => {
		try {
			await ChatRoomService.getInstance().deleteChatRoomUser(chatRoomId, userId);
			socket.broadcast.to(`chat-${chatRoomId}`).emit(chatEvents.LEFT_CHAT_ROOM, { chatRoomId, userId });
			socket.leave(`chat-${chatRoomId}`);
		} catch (err) {
			socket.emit(chatEvents.ERROR.TYPE, chatEvents.ERROR.MESSAGES.LEAVE);
		}
	},
	updateChatRoomName: async (
		socket: Socket,
		namespace: Namespace,
		{ chatRoomId, chatRoomName }: UpdateChatRoomNameReqType
	) => {
		try {
			await ChatRoomService.getInstance().updateChatRoomName(chatRoomId, chatRoomName);
			namespace.to(`chat-${chatRoomId}`).emit(chatEvents.UPDATED_CHAT_ROOM_NAME, { chatRoomId, chatRoomName });
		} catch (err) {
			socket.emit(chatEvents.ERROR.TYPE, chatEvents.ERROR.MESSAGES.UPDATE);
		}
	}
};

const joinSocketToChatRoom = (userList: UserListType, teamId: number, chatRoom: ChatRoomLastMessageType) => {
	userList.forEach((user) => {
		const onlineUserSocketId = Object.keys(onlineUsersInfo).find((socketId) => {
			return onlineUsersInfo[socketId].userId === user.userId && onlineUsersInfo[socketId].teamId === teamId;
		});
		if (onlineUserSocketId && onlineUsersInfo[onlineUserSocketId].socket) {
			onlineUsersInfo[onlineUserSocketId].socket.join(`chat-${chatRoom.chatRoomId}`);
			onlineUsersInfo[onlineUserSocketId].socket.emit(chatEvents.INVITED_TO_CHAT_ROOM, chatRoom);
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

export default chatHandler;
