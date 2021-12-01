import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamUser } from './team-user';
import { ChatRoomUser } from './chat_room-user';

@Entity({ name: 'user' })
export class User {
	@PrimaryGeneratedColumn()
	user_id!: number;

	@Column()
	user_email: string;

	@Column()
	user_password: string;

	@Column()
	user_name: string;

	@Column()
	github_id?: string;

	@Column()
	github_name?: string;

	@Column()
	user_color: number;

	@OneToMany(() => TeamUser, (teamUser) => teamUser.user, { cascade: true })
	team_users: TeamUser[];

	@OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.user, { cascade: true })
	chat_room_users: ChatRoomUser[];
}
