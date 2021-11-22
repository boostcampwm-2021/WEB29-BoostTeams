import { getCustomRepository } from 'typeorm';
import UserRepository from '@repositories/user-repository';
import Crypto from 'crypto-js';
import bcrypt from 'bcrypt';
import { User } from '@entities/user';

class UserService {
	static instance: UserService;
	userRepository: UserRepository;

	constructor() {
		this.userRepository = getCustomRepository(UserRepository);
	}

	static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}

	async getUser(userId: number) {
		const user = await this.userRepository.findOne(userId);

		if (!user) {
			return undefined;
		}

		const { user_id, user_email, user_name, user_color, github_id, github_name } = user;
		return { user_id, user_email, user_name, user_color, github_id, github_name };
	}

	async createUser(
		user_email: string,
		encryptedPassword: string,
		user_name: string,
		github_id?: string,
		github_name?: string
	) {
		const decryptedPassword = Crypto.AES.decrypt(encryptedPassword, process.env.AES_KEY).toString();
		const user_password = bcrypt.hashSync(decryptedPassword, Number(process.env.SALT_OR_ROUNDS));
		const user_color = Math.floor(Math.random() * 12);
		const githubId = github_id ?? '';
		const githubName = github_name ?? '';
		const newUser = await this.userRepository.save({
			user_email,
			user_password,
			user_name,
			user_color,
			github_id: githubId,
			github_name: githubName
		});
		return newUser;
	}

	async updateUserToName(user_id: number, newName: string) {
		return await this.userRepository.update({ user_id }, { user_name: newName });
	}

	async updateUserToGithub(user_id: number, github_id: string, github_name: string) {
		return await this.userRepository.update({ user_id }, { github_id, github_name });
	}

	async getUserByEmail(user_email: string) {
		const user = await this.userRepository.findOne({
			where: { user_email }
		});
		return user;
	}

	async getUserByName(user_name: string) {
		const users = await this.userRepository.find({
			where: {
				user_name: user_name
			}
		});
		return users.reduce((pre: User, cur: User) => {
			if (cur.user_name === user_name) {
				pre = cur;
			}
			return pre;
		}, undefined);
	}
}

export default UserService;
