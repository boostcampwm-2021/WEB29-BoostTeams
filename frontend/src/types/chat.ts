export type ChatModeType = 'none' | 'create' | 'chat';

export interface ChatRoomType {
	chatRoomId: number;
	chatRoomName: string;
	lastMessage: MessageType;
}

export interface ChatRoomsType {
	[chatRoomId: number]: ChatRoomType;
}

export interface UserIdType {
	userId: number;
}

export interface ChatRoomInfoType {
	chatRoomId: number;
	userList: UserIdType[];
}

export interface MessageType {
	messageId: number;
	content: string;
	createdAt: Date;
	userId: number;
}

export type MessageList = MessageType[];

export interface TeamUserType {
	userId: number;
	name: string;
	email: string;
	color: number;
}

export interface TeamUsersType {
	[userId: number]: TeamUserType;
}

export interface ChatRoomReqType {
	team_id: number;
	chat_room_name: string;
	user_id_list: { user_id: number }[];
}

export interface ChatRoomResType {
	chat_room_id: number;
	team_id: number;
	chat_room_name: string;
}

export const messagesEx = [
	{ messageId: 1, userId: 1, content: 'hi', createdAt: new Date() },
	{ messageId: 2, userId: 2, content: 'hi', createdAt: new Date() },
	{ messageId: 3, userId: 3, content: 'hi', createdAt: new Date() },
	{ messageId: 4, userId: 4, content: 'hi', createdAt: new Date() },
	{ messageId: 5, userId: 1, content: 'hi', createdAt: new Date() },
	{ messageId: 6, userId: 2, content: 'hi', createdAt: new Date() },
];
