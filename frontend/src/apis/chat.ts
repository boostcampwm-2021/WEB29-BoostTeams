import { Socket } from 'socket.io-client';
import { chatEvents } from '@src/types/eventType';
import { ChatRoomListType, ChatRoomType, MessageListType, MessageType } from '@src/types/chat';
import { UserIdType } from '@src/types/team';

export const socketApi = {
	enterChatPage: (socket: Socket, teamId: number, userId: number): void => {
		socket.emit(chatEvents.ENTER_CHAT_PAGE, { teamId, userId });
	},
	enterChatRoom: (socket: Socket, chatRoomId: number): void => {
		socket.emit(chatEvents.ENTER_CHAT_ROOM, { chatRoomId });
	},
	sendMessage: (socket: Socket, content: string, userId: number, chatRoomId: number): void => {
		socket.emit(chatEvents.SEND_MESSAGE, { content, userId, chatRoomId });
	},
	createChatRoom: (
		socket: Socket,
		teamId: number,
		chatRoomName: string,
		userList: UserIdType[],
		messageData: { content: string; userId: number },
	): void => {
		socket.emit(chatEvents.CREATE_CHAT_ROOM, { teamId, chatRoomName, userList, messageData });
	},
	inviteUsers: (socket: Socket, teamId: number, chatRoomId: number, userList: UserIdType[]): void => {
		socket.emit(chatEvents.INVITE_USERS, { teamId, chatRoomId, userList });
	},
	exitChatRoom: (socket: Socket, chatRoomId: number, userId: number): void => {
		socket.emit(chatEvents.EXIT_CHAT_ROOM, { chatRoomId, userId });
	},
	updateChatRoomName: (socket: Socket, chatRoomId: number, chatRoomName: string): void => {
		socket.emit(chatEvents.UPDATE_CHAT_ROOM_NAME, { chatRoomId, chatRoomName });
	},
	receiveMessage: (socket: Socket, handler: (message: MessageType) => void): void => {
		socket.on(chatEvents.RECEIVE_MESSAGE, (message) => handler(message));
	},
	joinChatRoom: (socket: Socket, handler: (chatRoomId: number, userList: UserIdType[]) => void): void => {
		socket.on(chatEvents.JOIN_CHAT_ROOM, ({ chatRoomId, userList }) => handler(chatRoomId, userList));
	},
	leftChatRoom: (socket: Socket, handler: (chatRoomId: number, userId: number) => void): void => {
		socket.on(chatEvents.LEFT_CHAT_ROOM, ({ chatRoomId, userId }) => handler(chatRoomId, userId));
	},
	receiveChatRoomsInfo: (socket: Socket, handler: (chatRooms: ChatRoomListType) => void): void => {
		socket.on(chatEvents.RECEIVE_CHAT_ROOMS_INFO, ({ chatRooms }) => handler(chatRooms));
	},
	receiveChatRoomInfo: (
		socket: Socket,
		handler: (userList: UserIdType[], messageList: MessageListType) => void,
	): void => {
		socket.on(chatEvents.RECEIVE_CHAT_ROOM_INFO, ({ userList, messageList }) => handler(userList, messageList));
	},
	invitedToChatRoom: (socket: Socket, handler: (chatRoom: ChatRoomType) => void): void => {
		socket.on(chatEvents.INVITED_TO_CHAT_ROOM, (chatRoom) => handler(chatRoom));
	},
	updatedChatRoomName: (socket: Socket, handler: (chatRoomId: number, chatRoomName: string) => void): void => {
		socket.on(chatEvents.UPDATED_CHAT_ROOM_NAME, ({ chatRoomId, chatRoomName }) => handler(chatRoomId, chatRoomName));
	},
	error: (socket: Socket, handler: (errorMessage: string) => void): void => {
		socket.on(chatEvents.ERROR.TYPE, (errorMessage) => handler(errorMessage));
	},
	offReceiveMessage: (socket: Socket): void => {
		socket.off(chatEvents.RECEIVE_MESSAGE);
	},
	offJoinChatRoom: (socket: Socket): void => {
		socket.off(chatEvents.JOIN_CHAT_ROOM);
	},
	offLeftChatRoom: (socket: Socket): void => {
		socket.off(chatEvents.LEFT_CHAT_ROOM);
	},
	offReceiveChatRoomsInfo: (socket: Socket): void => {
		socket.off(chatEvents.RECEIVE_CHAT_ROOMS_INFO);
	},
	offReceiveChatRoomInfo: (socket: Socket): void => {
		socket.off(chatEvents.RECEIVE_CHAT_ROOM_INFO);
	},
	offInvitedToChatRoom: (socket: Socket): void => {
		socket.off(chatEvents.INVITED_TO_CHAT_ROOM);
	},
	offUpdatedChatRoomName: (socket: Socket): void => {
		socket.off(chatEvents.UPDATED_CHAT_ROOM_NAME);
	},
	offError: (socket: Socket): void => {
		socket.off(chatEvents.ERROR.TYPE);
	},
};
