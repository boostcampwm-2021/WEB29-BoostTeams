import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from './team';

@Entity({ name: 'schedule' })
export class Schedule {
	@PrimaryGeneratedColumn()
	schedule_id!: number;

	@ManyToOne(() => Team, (team) => team.team_id)
	@JoinColumn({ name: 'team_id' })
	team: Team;

	@Column()
	user_email: string;

	@Column()
	title: string;

	@Column()
	start_date: Date;

	@Column()
	end_date: Date;

	@Column()
	repeat_id: string;

	@Column()
	content: string;

	@Column()
	color: number;
}
