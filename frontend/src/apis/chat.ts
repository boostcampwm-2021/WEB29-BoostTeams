import { toast } from 'react-toastify';
import fetchApi from '@utils/fetch';
import { RoomInfoType } from '@components/Chat/dataStructure';

export const createChatRoom = async (roomInfo: RoomInfoType): Promise<any> => {
	try {
		const res = await fetchApi.post('/api/chat/room', { ...roomInfo });
		if (res.status === 409) throw new Error();
		const data = await res.json();
		return data;
	} catch (err) {
		toast.error('😣 채팅방 생성에 실패하였습니다!');
		return [];
	}
};
