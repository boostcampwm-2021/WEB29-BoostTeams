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
		const { team_id, chat_room_name, user_id_list } = chatRoomInfo;

		const newChatRoom = await this.chatRoomRepository
			.createQueryBuilder()
			.insert()
			.into('chat_room')
			.values({ team_id, chat_room_name })
			.execute();
		if (!newChatRoom) throw new Error('채팅방 생성 오류');

		const chat_room_id = newChatRoom.raw.insertId;
		const chatUsers = user_id_list.map((user) => {
			return { user_id: user.user_id, chat_room_id };
		});

		const addUserToChatRoomResult = await this.chatRoomUserRepository
			.createQueryBuilder()
			.insert()
			.into('chat_room_user')
			.values(chatUsers)
			.execute();
		if (!addUserToChatRoomResult) throw new Error('채팅방 유저 초대 오류');

		return { chat_room_id, chat_room_name, user_id_list };
	}
}

interface UserIdType {
	user_id: number;
}

interface ChatRoomInfoType {
	team_id: number;
	chat_room_name: string;
	user_id_list: UserIdType[];
}

export default ChatRoomService;
