import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { User } from './user';
import { Team } from './team';

@Entity({ name: 'postit' })
export class Postit {
	@PrimaryGeneratedColumn()
	postit_id!: number;

	@ManyToOne(() => User, (user) => user.user_id)
	@JoinColumn({ name: 'created_by' })
	user: User;

	@ManyToOne(() => User, (user) => user.user_id)
	@JoinColumn({ name: 'updated_by' })
	user2: User;

	@ManyToOne(() => Team, (team) => team.team_id)
	@JoinColumn({ name: 'team_id' })
	team: Team;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column()
	x: number;

	@Column()
	y: number;

	@Column()
	color: number;
}
