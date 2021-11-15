import { EntityRepository, Repository } from 'typeorm';
import { ChatRoomUser } from '@entities/chat_room-user';

@EntityRepository(ChatRoomUser)
export default class ChatRoomUserRepository extends Repository<ChatRoomUser> {}
