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
		const { team_id, chat_room_name, user_list } = chatRoomInfo;
		const newChatRoom = await this.chatRoomRepository
			.createQueryBuilder()
			.insert()
			.into('chat_room')
			.values({ team_id, chat_room_name })
			.execute();
		if (!newChatRoom) throw new Error('채팅방 생성 오류');

		const chat_room_id = newChatRoom.raw.insertId;
		const chatUsers = user_list.map((user) => {
			return { user_id: user.user_id, chat_room_id };
		});
		const addUserResult = await this.chatRoomUserRepository
			.createQueryBuilder()
			.insert()
			.into('chat_room_user')
			.values(chatUsers)
			.execute();
		if (!addUserResult) throw new Error('채팅방 유저 초대 오류');
		return { chat_room_id, chat_room_name, user_list };
	}

	async getChatRooms(teamId: number, userId: number) {
		const chatRooms = await this.chatRoomRepository
			.createQueryBuilder('chat_room')
			.select('chat_room.chat_room_id')
			.addSelect('chat_room.chat_room_name')
			.innerJoin('chat_room.chat_room_users', 'chat_room_user')
			.where('chat_room.team_id = :teamId', { teamId })
			.andWhere('chat_room_user.user_id =:userId', { userId })
			.getMany();
		if (!chatRooms) throw new Error('채팅방 목록 불러오기 오류');
		return { chat_rooms: chatRooms };
	}

	async getChatRoomInfo(chatRoomId) {
		const chatRoomInfo = await this.chatRoomRepository
			.createQueryBuilder('chat_room')
			.select('chat_room.chat_room_id')
			.addSelect('chat_room_user.user_id')
			.innerJoin('chat_room.chat_room_users', 'chat_room_user')
			.where('chat_room.chat_room_id = :chatRoomId', { chatRoomId })
			.getOne();
		if (!chatRoomInfo) throw new Error('채팅방 정보 불러오기 오류');
		return chatRoomInfo;
	}
}

interface UserIdType {
	user_id: number;
}

interface ChatRoomInfoType {
	team_id: number;
	chat_room_name: string;
	user_list: UserIdType[];
}

export default ChatRoomService;
