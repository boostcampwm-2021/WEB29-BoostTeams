import { UserIdType } from './team';

export type ChatModeType = 'none' | 'create' | 'chat';

export interface ChatRoomType {
	chatRoomId: number;
	chatRoomName: string;
}

export interface ChatRoomsType {
	[chatRoomId: number]: ChatRoomType;
}

export interface ChatRoomsLastMessageType {
	[chatRoomId: number]: MessageType;
}

export interface ChatRoomUsersType {
	chatRoomId: number;
	userList: UserIdType[];
}

export interface MessageType {
	messageId: number;
	content: string;
	createdAt: Date;
	userId: number;
	chatRoomId: number;
}

export type MessageListType = MessageType[];

export interface ChatRoomReqType {
	team_id: number;
	chat_room_name: string;
	user_list: { user_id: number }[];
}

export interface ChatRoomResType {
	chat_room_id: number;
	chat_room_name: string;
}

export const messagesEx = [
	{ messageId: 1, userId: 1, content: 'hi', createdAt: new Date(), chatRoomId: 1 },
	{ messageId: 2, userId: 2, content: 'hi', createdAt: new Date(), chatRoomId: 1 },
	{ messageId: 3, userId: 3, content: 'hi', createdAt: new Date(), chatRoomId: 1 },
	{ messageId: 4, userId: 4, content: 'hi', createdAt: new Date(), chatRoomId: 1 },
	{ messageId: 5, userId: 1, content: 'hi', createdAt: new Date(), chatRoomId: 1 },
	{ messageId: 6, userId: 2, content: 'hi', createdAt: new Date(), chatRoomId: 1 },
];
