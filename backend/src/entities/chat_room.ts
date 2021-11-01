import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import { ChatRoomUser } from './chat_room-user';
import { Message } from './message';
import { Team } from './team';

@Entity({ name: 'chat_room' })
export class ChatRoom {
	@PrimaryGeneratedColumn()
	chat_room_id!: number;

	@ManyToOne(() => Team, (team) => team.team_id)
	@JoinColumn({ name: 'team_id' })
	team: Team;

	@Column()
	chat_room_name: string;

	@OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.chat_room)
	chat_room_users: ChatRoomUser[];

	@OneToMany(() => Message, (message) => message.chat_room)
	messages: Message[];
}
