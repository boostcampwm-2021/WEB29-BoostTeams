import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/user-repository';
import Crypto from 'crypto-js';
import bcrypt from 'bcrypt';

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

		const { user_id, user_email, user_name, user_state } = user;
		return { user_id, user_email, user_name, user_state };
	}

	async createUser(user_email: string, encryptedPassword: string, user_name: string) {
		const decryptedPassword = Crypto.AES.decrypt(encryptedPassword, process.env.AES_KEY).toString();
		const user_password = bcrypt.hashSync(decryptedPassword, Number(process.env.SALT_OR_ROUNDS));
		const newUser = await this.userRepository.save({ user_email, user_password, user_name, user_state: 0 });
		return newUser;
	}

	async getUserByEmail(user_email: string) {
		const user = await this.userRepository.findOne({
			where: { user_email }
		});
		return user;
	}

	async getUserByName(user_name: string) {
		const user = await this.userRepository.findOne({
			where: {
				user_name: user_name
			}
		});
		return user;
	}
}

export default UserService;
