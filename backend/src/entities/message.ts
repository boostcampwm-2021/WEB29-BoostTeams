import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Column, CreateDateColumn } from 'typeorm';
import { ChatRoom } from './chat_room';
import { Reaction } from './reaction';
import { User } from './user';

@Entity({ name: 'message' })
export class Message {
	@PrimaryGeneratedColumn()
	message_id!: number;

	@ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chat_room_id)
	@JoinColumn({ name: 'chat_room_id' })
	chat_room: ChatRoom;

	@ManyToOne(() => User, (user) => user.user_id)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	content: string;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => Reaction, (reaction) => reaction.message_id)
	reactions: Reaction[];
}
