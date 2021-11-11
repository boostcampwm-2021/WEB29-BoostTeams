import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from './team';

@Entity({ name: 'schedule' })
export class Schedule {
	@PrimaryGeneratedColumn()
	schedule_id!: number;

	@Column()
	team_id: number;

	@ManyToOne(() => Team, (team) => team.team_id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'team_id' })
	team: Team;

	@Column()
	title: string;

	@Column()
	start_date: Date;

	@Column()
	end_date: Date;

	@Column({ nullable: true })
	repeat_id: string;

	@Column()
	repeat_option: number;

	@Column()
	content: string;

	@Column()
	color: number;
}
