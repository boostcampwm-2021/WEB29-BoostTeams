import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatRoom } from './chat_room';
import { Schedule } from './schedule';
import { TeamUser } from './team-user';

@Entity({ name: 'team' })
export class Team {
	@PrimaryGeneratedColumn()
	team_id!: number;

	@Column()
	team_name: string;

	@Column()
	team_desc!: string;

	@OneToMany(() => TeamUser, (teamUser) => teamUser.team, { cascade: true })
	team_users: TeamUser[];

	@OneToMany(() => Schedule, (schedule) => schedule.team, { cascade: true })
	schedules: Schedule[];

	@OneToMany(() => ChatRoom, (chatRoom) => chatRoom.team, { cascade: true })
	chat_rooms: ChatRoom[];
}
