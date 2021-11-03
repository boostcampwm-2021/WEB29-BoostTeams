import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Postit } from './postit';
import { TeamUser } from './team-user';

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
	user_state: number;

	@OneToMany(() => TeamUser, (teamUser) => teamUser.user)
	team_users: TeamUser[];

	@OneToMany(() => Postit, (postit) => postit.user)
	postits: Postit[];

	@OneToMany(() => Postit, (postit) => postit.user2)
	postit2: Postit[];
}
