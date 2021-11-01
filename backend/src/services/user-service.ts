import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/user-repository';

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
			throw new Error('Not Found User');
		}

		const { user_id, user_email, user_name } = user;
		return { user_id, user_email, user_name };
	}

	async createUser(user_email: string, user_password: string, user_name: string) {
		const newUser = await this.userRepository.save({ user_email, user_password, user_name, user_state: '자리 비움' });
		return newUser;
	}
}

export default UserService;
