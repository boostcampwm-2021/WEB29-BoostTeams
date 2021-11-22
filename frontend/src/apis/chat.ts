import { toast } from 'react-toastify';
import fetchApi from '@utils/fetch';
import {
	ChatRoomReqType,
	ChatRoomResType,
	ChatRoomType,
	ChatRoomInfoType,
	MessageList,
	ChatRoomsType,
} from '@src/types/chat';

export const createChatRoom = async (roomInfo: ChatRoomReqType): Promise<ChatRoomType | undefined> => {
	try {
		const res = await fetchApi.post('/api/chat/room', { ...roomInfo });
		if (res.status === 409) throw new Error();
		const data = await res.json();
		return {
			chatRoomId: data.chat_room_id,
			chatRoomName: data.chat_room_name,
			lastMessage: { messageId: 1, content: '메시지 내용', createdAt: new Date(), userId: 55 },
		};
	} catch (err) {
		toast.error('😣 채팅방 생성에 실패하였습니다!');
		return undefined;
	}
};

export const getChatRooms = async (teamId: number, userId: number): Promise<ChatRoomsType> => {
	try {
		const res = await fetchApi.get(`/api/chat/room?teamId=${teamId}&userId=${userId}`);
		if (res.status === 409) throw new Error();
		const data = await res.json();
		const entries = data.chat_rooms.map((chatRoom: ChatRoomResType) => {
			return [
				chatRoom.chat_room_id,
				{
					chatRoomId: chatRoom.chat_room_id,
					chatRoomName: chatRoom.chat_room_name,
					lastMessage: { messageId: 1, content: '메시지 내용', createdAt: new Date(), userId: 55 },
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

export const getChatRoomInfo = async (chatRoomId: number): Promise<ChatRoomInfoType | undefined> => {
	try {
		const res = await fetchApi.get(`/api/chat/room/${chatRoomId}`);
		if (res.status === 409) throw new Error();
		const data = await res.json();
		const userList = data.chat_room_users.map((user: { user_id: number }) => {
			return { userId: user.user_id };
		});
		return { chatRoomId: data.chat_room_id, userList };
	} catch (err) {
		toast.error('😣 채팅방 정보 가져오기에 실패하였습니다!');
		return undefined;
	}
};

export const getMessageList = async (chatRoomId: number): Promise<MessageList> => {
	try {
		const res = await fetchApi.get(`/api/chat/message?chatRoomId=${chatRoomId}`); // 스크롤 나중에
		if (res.status === 409) throw new Error();
		const data = await res.json();
		return data.message_list;
	} catch (err) {
		toast.error('😣 메시지 가져오기에 실패하였습니다!');
		return [];
	}
};
