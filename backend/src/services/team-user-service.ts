import { getCustomRepository } from 'typeorm';
import TeamUserRepository from '../repositories/team-user-repository';

export default class TeamUserService {
	static instance: TeamUserService;
	teamUserRepository: TeamUserRepository;

	constructor() {
		this.teamUserRepository = getCustomRepository(TeamUserRepository);
	}

	static getInstance(): TeamUserService {
		if (!TeamUserService.instance) {
			TeamUserService.instance = new TeamUserService();
		}
		return TeamUserService.instance;
	}

	async create(userId: number, teamId: number) {
		try {
			await this.teamUserRepository
				.createQueryBuilder()
				.insert()
				.into('team_user')
				.values({
					user: userId,
					team: teamId,
					state: false
				})
				.execute();
		} catch (err) {
			throw err;
		}
	}

	async read(userId: number) {
		try {
			return await this.teamUserRepository
				.createQueryBuilder('team_user')
				.leftJoinAndSelect('team_user.team', 'team')
				.where('team_user.user = :userId', { userId })
				.getMany();
		} catch (err) {
			throw err;
		}
	}

	async update(userId: number, teamId: number) {
		try {
			await this.teamUserRepository
				.createQueryBuilder()
				.update()
				.set({ state: true })
				.where('team = :teamId', { teamId })
				.andWhere('user = :userId', { userId })
				.execute();
		} catch (err) {
			throw err;
		}
	}

	async delete(userId: number, teamId: number) {
		try {
			await this.teamUserRepository
				.createQueryBuilder()
				.delete()
				.from('team_user')
				.where('team = :teamId', { teamId })
				.andWhere('user = :userId', { userId })
				.execute();
		} catch (err) {
			throw err;
		}
	}
}
