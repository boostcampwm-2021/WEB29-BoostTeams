import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Postit } from './postit';
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
	github_name?: string;

	@Column()
	user_state: number;

	@OneToMany(() => TeamUser, (teamUser) => teamUser.user)
	team_users: TeamUser[];

	@OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.user)
	chat_room_users: ChatRoomUser[];

	@OneToMany(() => Postit, (postit) => postit.user)
	postits: Postit[];

	@OneToMany(() => Postit, (postit) => postit.user2)
	postit2: Postit[];
}
