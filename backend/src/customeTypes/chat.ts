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
export interface ChatRoomType {
	chat_room_id: number;
	chat_room_name: string;
}
export interface ChatRoomLastMessageType {
	chatRoomId: number;
	chatRoomName: string;
	lastMessage: MessageType;
}
export interface UserIdType {
	user_id: number;
}
export interface ChatRoomInfoType {
	team_id: number;
	chat_room_name: string;
	user_list: UserIdType[];
}
export interface EnterChatPageReqType {
	teamId: number;
	userId: number;
}
export interface EnterChatRoomReqType {
	chatRoomId: number;
}
export interface CreateChatRoomReqType {
	teamId: number;
	chatRoomName: string;
	userList: UserListType;
	messageData: MessageReqType;
}
export interface InviteUserReqType {
	teamId: number;
	chatRoomId: number;
	userList: UserListType;
}
export interface LeaveChatRoomReqType {
	chatRoomId: number;
	userId: number;
}
export interface UpdateChatRoomNameReqType {
	chatRoomId: number;
	chatRoomName: string;
}
