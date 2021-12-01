import { getCustomRepository } from 'typeorm';
import ChatRoomRepository from '@repositories/chat_room-repository';
import ChatRoomUserRepository from '@repositories/chat_room-user-repository';
import { ChatRoomInfoType, UserIdType } from '@customeTypes/chat';

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

	async getChatRoom(chatRoomId: number) {
		const chatRoom = await this.chatRoomRepository
			.createQueryBuilder('chat_room')
			.select('chat_room.chat_room_id')
			.addSelect('chat_room.chat_room_name')
			.innerJoin('chat_room.chat_room_users', 'chat_room_user')
			.where('chat_room.chat_room_id = :chatRoomId', { chatRoomId })
			.getOne();
		if (!chatRoom) throw new Error('채팅방 불러오기 오류');
		return { chat_room: chatRoom };
	}

	async updateChatRoomName(chatRoomId: number, chatRoomName: string) {
		const updatedChatRoom = await this.chatRoomRepository
			.createQueryBuilder()
			.update('chat_room')
			.set({ chat_room_name: chatRoomName })
			.where('chat_room_id = :chatRoomId', { chatRoomId })
			.execute();
		if (!updatedChatRoom) throw new Error('채팅방 이름 변경 오류');
	}

	async getChatRoomUsers(chatRoomId: number) {
		const chatRoomInfo = await this.chatRoomRepository
			.createQueryBuilder('chat_room')
			.select('chat_room.chat_room_id')
			.addSelect('chat_room_user.user_id')
			.innerJoin('chat_room.chat_room_users', 'chat_room_user')
			.where('chat_room.chat_room_id = :chatRoomId', { chatRoomId })
			.getOne();
		if (!chatRoomInfo) throw new Error('채팅방 유저 가져오기 오류');
		return chatRoomInfo;
	}

	async addChatRoomUsers(chatRoomId: number, userList: UserIdType[]) {
		const chatUsers = userList.map((user) => {
			return { user_id: user.user_id, chat_room_id: chatRoomId };
		});
		const addedUsers = await this.chatRoomUserRepository
			.createQueryBuilder()
			.insert()
			.into('chat_room_user')
			.values(chatUsers)
			.execute();
		if (!addedUsers) throw new Error('채팅방 유저 추가 오류');
	}

	async deleteChatRoomUser(chatRoomId: number, userId: number) {
		const deletedUser = await this.chatRoomUserRepository
			.createQueryBuilder()
			.delete()
			.from('chat_room_user')
			.where('chat_room_id = :chatRoomId', { chatRoomId })
			.andWhere('user_id = :userId', { userId })
			.execute();
		if (!deletedUser) throw new Error('채팅방 유저 삭제 오류');
	}
}
export default ChatRoomService;
