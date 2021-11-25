import { toast } from 'react-toastify';
import fetchApi from '@utils/fetch';
import {
	ChatRoomReqType,
	ChatRoomResType,
	ChatRoomType,
	ChatRoomUsersType,
	ChatRoomsType,
	MessageListType,
	UserListReqType,
} from '@src/types/chat';
import { UserIdType } from '@src/types/team';
import { Socket } from 'socket.io-client';

export const createChatRoom = async (roomInfo: ChatRoomReqType): Promise<ChatRoomType | undefined> => {
	try {
		const res = await fetchApi.post('/api/chats/rooms', { ...roomInfo });
		if (res.status !== 201) throw new Error();
		const data = await res.json();
		return {
			chatRoomId: data.chat_room_id,
			chatRoomName: data.chat_room_name,
		};
	} catch (err) {
		toast.error('😣 채팅방 생성에 실패하였습니다!');
		return undefined;
	}
};

export const getChatRooms = async (teamId: number, userId: number): Promise<ChatRoomsType> => {
	try {
		const res = await fetchApi.get(`/api/chats/rooms?teamId=${teamId}&userId=${userId}`);
		if (res.status !== 200) throw new Error();
		const data = await res.json();
		const entries = data.chat_rooms.map((chatRoom: ChatRoomResType) => {
			return [
				chatRoom.chat_room_id,
				{
					chatRoomId: chatRoom.chat_room_id,
					chatRoomName: chatRoom.chat_room_name,
				},
			];
		});
		const chatRooms = Object.fromEntries(entries);
		return chatRooms;
	} catch (err) {
		toast.error('😣 채팅방 목록 가져오기에 실패하였습니다!');
		return [];
	}
};

export const updateChatRoomName = async (chatRoomId: number, chatRoomName: string): Promise<boolean> => {
	try {
		const res = await fetchApi.patch(`/api/chats/rooms/${chatRoomId}`, { chat_room_name: chatRoomName });
		if (res.status !== 201) throw new Error();
		return true;
	} catch (err) {
		toast.error('😣 채팅방 이름 변경에 실패하였습니다!');
		return false;
	}
};

export const getChatRoomUsers = async (chatRoomId: number): Promise<ChatRoomUsersType> => {
	try {
		const res = await fetchApi.get(`/api/chats/rooms/${chatRoomId}/users`);
		if (res.status !== 200) throw new Error();
		const data = await res.json();
		const userList = data.chat_room_users.map((user: { user_id: number }) => {
			return { userId: user.user_id };
		});
		return { userList };
	} catch (err) {
		toast.error('😣 채팅방 유저 목록 가져오기에 실패하였습니다!');
		return { userList: [] };
	}
};

export const addChatRoomUsers = async (chatRoomId: number, userList: UserListReqType): Promise<boolean> => {
	try {
		const res = await fetchApi.post(`/api/chats/rooms/${chatRoomId}/users`, { user_list: userList });
		if (res.status !== 201) throw new Error();
		return true;
	} catch (err) {
		toast.error('😣 유저 초대하기에 실패하였습니다!');
		return false;
	}
};

export const deleteChatRoomUser = async (chatRoomId: number, userId: number): Promise<boolean> => {
	try {
		const res = await fetchApi.delete(`/api/chats/rooms/${chatRoomId}/users/${userId}`);
		if (res.status !== 204) throw new Error();
		return true;
	} catch (err) {
		toast.error('😣 채팅방 나가기에 실패하였습니다!');
		return false;
	}
};

export const socketApi = {
	enterChatRooms: (socket: Socket, chatRoomList: { chatRoomId: number }[]) => {
		socket.emit('enter chat rooms', { chatRooms: chatRoomList });
	},
	leaveChatRooms: (socket: Socket, chatRoomList: { chatRoomId: number }[]) => {
		socket.emit('refresh chat rooms', { chatRooms: chatRoomList });
	},
	createChatRoom: (socket: Socket, chatRoomId: number, userList: UserIdType[], teamId: number) => {
		socket.emit('create chat room', { chatRoomId, userList, teamId });
	},
	inviteUsers: (socket: Socket, chatRoomId: number, userList: UserIdType[], teamId: number) => {
		socket.emit('invite users', { chatRoomId, userList, teamId });
	},
	exitChatRoom: (socket: Socket, chatRoomId: number) => {
		socket.emit('exit chat room', { chatRoomId });
	},
	getMessageList: (socket: Socket, chatRoomId: number) => {
		socket.emit('get message list', { chatRoomId });
	},
	sendMessage: (socket: Socket, content: string, userId: number, chatRoomId: number) => {
		socket.emit('send message', { content, userId, chatRoomId });
	},
	updateChatRoomName: (socket: Socket, chatRoomId: number) => {
		socket.emit('update chat room name', { chatRoomId });
	},
};
