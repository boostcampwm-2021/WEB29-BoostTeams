export interface ChatModeType {
	chatMode: 'none' | 'create' | 'chat';
}

export type DropdownModeType = 'none' | 'invite' | 'update' | 'users';

export interface ChatRoomType {
	chatRoomId: number;
	chatRoomName: string;
	lastMessage: MessageType;
}

export type ChatRoomListType = ChatRoomType[];

export interface MessageType {
	messageId: number;
	content: string;
	createdAt: Date;
	userId: number;
	chatRoomId: number;
}

export type MessageListType = MessageType[];
