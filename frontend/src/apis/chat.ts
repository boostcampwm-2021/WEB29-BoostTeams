import { toast } from 'react-toastify';
import fetchApi from '@utils/fetch';
import { ChatRoomReqType, ChatRoomType } from '@components/Chat/dataStructure';

export const createChatRoom = async (roomInfo: ChatRoomReqType): Promise<ChatRoomType | undefined> => {
	try {
		const res = await fetchApi.post('/api/chat/room', { ...roomInfo });
		if (res.status === 409) throw new Error();
		const data = await res.json();
		return { chat_room_id: data.chat_room_id, chat_room_name: data.chat_room_name };
	} catch (err) {
		toast.error('😣 채팅방 생성에 실패하였습니다!');
		return undefined;
	}
};

export const getChatRooms = async (teamId: number, userId: number): Promise<ChatRoomType[]> => {
	try {
		const res = await fetchApi.get(`/api/chat/room?teamId=${teamId}&userId=${userId}`);
		if (res.status === 409) throw new Error();
		const data = await res.json();
		return data.chat_rooms;
	} catch (err) {
		toast.error('😣 채팅방 목록 가져오기에 실패하였습니다!');
		return [];
	}
};
