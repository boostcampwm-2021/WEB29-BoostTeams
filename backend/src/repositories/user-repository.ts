import { EntityRepository, AbstractRepository } from 'typeorm';
import { User } from '@entities/user';

import bcrypt from 'bcrypt';

@EntityRepository(User)
export default class UserRepository extends AbstractRepository<User> {
	async getUser(userId: number) {
		this.repository;
		this.repository.createQueryBuilder;
		this.createQueryBuilder;
		const user = await this.repository
			.createQueryBuilder('user')
			.select()
			.where('user_id = :userId', { userId })
			.getOne();

		if (!user) return undefined;

		const { user_id, user_email, user_name, user_color, github_id, github_name } = user;
		return { user_id, user_email, user_name, user_color, github_id, github_name };
	}

	async createUser(
		user_email: string,
		user_password: string,
		user_name: string,
		github_id?: string,
		github_name?: string
	) {
		const encryptedPassword = bcrypt.hashSync(user_password, Number(process.env.SALT_OR_ROUNDS));
		const user_color = Math.floor(Math.random() * 12);
		const githubId = github_id ?? '';
		const githubName = github_name ?? '';
		const rawNewUserData = {
			user_email,
			user_password: encryptedPassword,
			user_name,
			user_color,
			github_id: githubId,
			github_name: githubName
		};
		const newUser = await this.repository
			.createQueryBuilder('user')
			.insert()
			.into('user')
			.values(rawNewUserData)
			.execute();
		return newUser.raw.user_id;
	}

	async updateUserToName(user_id: number, newName: string) {
		return await this.repository
			.createQueryBuilder('user')
			.update('user')
			.set(newName)
			.where('user.user_id=:user_id', { user_id })
			.execute();
	}

	async updateUserToGithub(user_id: number, github_id: string, github_name: string) {
		return await this.repository
			.createQueryBuilder('user')
			.update('user')
			.set({ github_id, github_name })
			.where('user_id=:user_id', { user_id })
			.execute();
	}

	async getUserByEmail(user_email: string) {
		return await this.repository
			.createQueryBuilder('user')
			.select()
			.where('user_email=:user_email', { user_email })
			.getOne();
	}

	async getUserByUserName(user_name: string) {
		return await this.repository
			.createQueryBuilder('user')
			.select()
			.where('user_name=:user_name', { user_name })
			.execute();
	}

	async getUserByName(user_name: string) {
		const users = await this.repository
			.createQueryBuilder('user')
			.select()
			.where('user_name=:user_name', { user_name })
			.execute();
		return users.reduce((pre: User, cur: User) => {
			if (cur.user_name === user_name) {
				pre = cur;
			}
			return pre;
		}, undefined);
	}

	async deleteUser(userId: number) {
		await this.repository
			.createQueryBuilder('user')
			.delete()
			.from('user')
			.where('user_id=:userId', { userId })
			.execute();
	}
}
