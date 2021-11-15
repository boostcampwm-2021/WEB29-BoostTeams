import { EntityRepository, Repository } from 'typeorm';
import { ChatRoom } from '@entities/chat_room';

@EntityRepository(ChatRoom)
export default class ChatRoomRepository extends Repository<ChatRoom> {}
