import { UserIdType } from './team';

export interface ChatModeType {
	chatMode: 'none' | 'create' | 'chat';
}

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

export type UserListReqType = { user_id: number }[];

export interface ChatRoomReqType {
	team_id: number;
	chat_room_name: string;
	user_list: UserListReqType;
}

export interface ChatRoomResType {
	chat_room_id: number;
	chat_room_name: string;
}
