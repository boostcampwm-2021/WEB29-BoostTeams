import { getCustomRepository } from 'typeorm';
import ChatRoomRepository from '@repositories/chat_room-repository';
import ChatRoomUserRepository from '@repositories/chat_room-user-repository';

class ChatRoomService {
	static instance: ChatRoomService;
	chatRoomRepository: ChatRoomRepository;
	chatRoomUserRepository: ChatRoomUserRepository;

	constructor() {
		this.chatRoomRepository = getCustomRepository(ChatRoomRepository);
		this.chatRoomUserRepository = getCustomRepository(ChatRoomUserRepository);
	}

	static getInstance(): ChatRoomService {
		if (!ChatRoomService.instance) {
			ChatRoomService.instance = new ChatRoomService();
		}
		return ChatRoomService.instance;
	}

	async createChatRoom(chatRoomInfo: ChatRoomInfoType) {
		const { team_id, chat_room_name, user_email_list } = chatRoomInfo;
		const newChatRoom = await this.chatRoomRepository.save({ team_id, chat_room_name });
		if (!newChatRoom) throw new Error('채팅방 만들기 실패');
		// await this.chatRoomUserRepository.save({ user_id, chat_room_id: newChatRoom.chat_room_id});
		return newChatRoom;
	}
}

interface ChatRoomInfoType {
	team_id: number;
	chat_room_name: string;
	user_email_list: string[];
}

export default ChatRoomService;
