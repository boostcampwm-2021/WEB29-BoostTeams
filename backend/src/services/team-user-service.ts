import { getCustomRepository } from 'typeorm';
import TeamUserRepository from '@repositories/team-user-repository';

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
		await this.teamUserRepository
			.createQueryBuilder()
			.insert()
			.into('team_user')
			.values({
				user: userId,
				team: teamId,
				state: true
			})
			.execute();
	}

	async read(userId: number) {
		return await this.teamUserRepository
			.createQueryBuilder('team_user')
			.leftJoinAndSelect('team_user.team', 'team')
			.where('team_user.user = :userId', { userId })
			.getMany();
	}

	async update(userId: number, teamId: number) {
		await this.teamUserRepository
			.createQueryBuilder()
			.update()
			.set({ state: true })
			.where('team = :teamId', { teamId })
			.andWhere('user = :userId', { userId })
			.execute();
	}

	async delete(userId: number, teamId: number) {
		await this.teamUserRepository
			.createQueryBuilder()
			.delete()
			.from('team_user')
			.where('team = :teamId', { teamId })
			.andWhere('user = :userId', { userId })
			.execute();
	}
}
