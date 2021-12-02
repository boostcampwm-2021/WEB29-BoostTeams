import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { ChatRoom } from './chat_room';
import { User } from './user';

@Entity({ name: 'chat_room_user' })
export class ChatRoomUser {
	@PrimaryGeneratedColumn()
	chat_room_user_id!: number;

	@Column()
	user_id: number;

	@Column()
	chat_room_id: number;

	@ManyToOne(() => User, (user) => user.user_id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chat_room_id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'chat_room_id' })
	chat_room: ChatRoom;
}
