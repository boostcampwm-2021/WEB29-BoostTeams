import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Message } from './message';
import { User } from './user';

@Entity({ name: 'reaction' })
export class Reaction {
	@PrimaryGeneratedColumn()
	reaction_id: number;

	@ManyToOne(() => Message, (message) => message.message_id)
	message_id: Message;

	@ManyToOne(() => User, (user) => user.user_id)
	user_id: User;

	@Column()
	emoji_code: number;
}
