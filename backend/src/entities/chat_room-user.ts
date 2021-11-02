import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChatRoom } from './chat_room';
import { TeamUser } from './team-user';

@Entity({ name: 'chat_room_user' })
export class ChatRoomUser {
	@PrimaryGeneratedColumn()
	chat_room_user_id!: number;

	@ManyToOne(() => TeamUser, (teamUser) => teamUser.team_user_id)
	@JoinColumn({ name: 'user_id' })
	team_user: TeamUser;

	@ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chat_room_id)
	@JoinColumn({ name: 'chat_room_id' })
	chat_room: ChatRoom;
}
