export interface UserType {
	user_id: number;
	user_name: string;
	user_email: string;
}

export interface UserIdListType {
	user_id: number;
}

export type ChatModeType = 'none' | 'create' | 'chat';

export interface RoomInfoType {
	team_id: number;
	chat_room_name: string;
	user_id_list: { user_id: number }[];
}

export const chatRooms = [
	{
		title: '채팅방1',
		chat_room_id: 1,
		previewChat: { message: '안녕아아아아아아아아아아아아아아아아아아아아아아아아', name: '나', date: new Date() },
	},
	{
		title: '채팅방2',
		chat_room_id: 2,
		previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 15, 12, 0) },
	},
	{
		title: '채팅방3',
		chat_room_id: 3,
		previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 14, 12, 0) },
	},
	{
		title: '채팅방4',
		chat_room_id: 4,
		previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 7, 12, 0) },
	},
	{
		title: '채팅방5',
		chat_room_id: 5,
		previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 5, 12, 0) },
	},
	{
		title: '채팅방6',
		chat_room_id: 6,
		previewChat: { message: '안녕', name: '나', date: new Date(2021, 9, 17, 12, 0) },
	},
	{
		title: '채팅방7',
		chat_room_id: 7,
		previewChat: { message: '안녕', name: '나', date: new Date(2021, 9, 1, 12, 0) },
	},
];

export const messages = [
	{ message_id: 1, user_id: 1, user_name: 'user1', content: 'hi', created_at: new Date() },
	{ message_id: 2, user_id: 2, user_name: 'user2', content: 'hi2', created_at: new Date() },
	{ message_id: 3, user_id: 3, user_name: 'user3', content: 'hi3', created_at: new Date() },
	{
		message_id: 4,
		user_id: 4,
		user_name: 'user4',
		content: 'hiㅁㅎㅇㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㅁㅇㅎㄴㅇㅎㄴㅇㅎㄴㅁㅎㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㄴㅇㄴㅇㅎㄴㅎㅇ4',
		created_at: new Date(),
	},
	{ message_id: 5, user_id: 5, user_name: 'user5', content: 'hi3', created_at: new Date() },
	{ message_id: 6, user_id: 6, user_name: 'user6', content: 'hi4', created_at: new Date() },
	{ message_id: 7, user_id: 7, user_name: 'user7', content: 'hi3', created_at: new Date() },
	{ message_id: 8, user_id: 3, user_name: 'user8', content: 'hi4', created_at: new Date() },
	{ message_id: 9, user_id: 3, user_name: 'user9', content: 'hi3', created_at: new Date() },
	{ message_id: 10, user_id: 10, user_name: 'user10', content: 'hi4', created_at: new Date() },
	{ message_id: 11, user_id: 11, user_name: 'user11', content: 'hi3', created_at: new Date() },
	{ message_id: 12, user_id: 12, user_name: 'user12', content: 'hi4', created_at: new Date() },
];
