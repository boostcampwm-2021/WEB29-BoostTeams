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

	async getTeamsByUserId(userId: number) {
		const teams = await this.teamUserRepository
			.createQueryBuilder('teamUser')
			.leftJoinAndSelect('teamUser.team', 'team')
			.where('teamUser.user = :userId', { userId })
			.getMany();
		return teams;
	}
}
