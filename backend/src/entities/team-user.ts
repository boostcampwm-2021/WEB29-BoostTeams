import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Team } from './team';
import { User } from './user';

@Entity({ name: 'team_user' })
export class TeamUser {
	@PrimaryGeneratedColumn()
	team_user_id!: number;

	@ManyToOne(() => User, (user) => user.user_id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Team, (team) => team.team_id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'team_id' })
	team: Team;

	@Column()
	state: boolean;

	@Column()
	role: number;
}
