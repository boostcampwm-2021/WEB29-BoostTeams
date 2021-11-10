import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Column } from 'typeorm';
import { ChatRoomUser } from './chat_room-user';
import { Team } from './team';
import { User } from './user';

@Entity({ name: 'team_user' })
export class TeamUser {
	@PrimaryGeneratedColumn()
	team_user_id!: number;

	@ManyToOne(() => User, (user) => user.user_id)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Team, (team) => team.team_id)
	@JoinColumn({ name: 'team_id' })
	team: Team;

	@OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.chat_room_user_id)
	chat_room_users: ChatRoomUser[];

	@Column()
	state: Boolean;
}
