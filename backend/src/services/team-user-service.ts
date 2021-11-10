import { getCustomRepository } from 'typeorm';
import TeamUserRepository from '../repositories/team-user-repository';
import TeamRepository from '../repositories/team-repository';

interface teamInfo {
	team_id?: number;
	team_name: string;
	team_desc: string;
}
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
			.createQueryBuilder('team_user')
			.insert()
			.into('team_user')
			.values({
				user: userId,
				team: teamId,
				state: false
			})
			.execute();
	}

	async read(userId: number) {
		return await this.teamUserRepository
			.createQueryBuilder('teamUser')
			.leftJoinAndSelect('teamUser.team', 'team')
			.where('teamUser.user = :userId', { userId })
			.getMany();
	}

	async update(userId: number, teamId: number) {
		await this.teamUserRepository
			.createQueryBuilder()
			.update()
			.set({ state: true })
			.where('team_id=:id', { id: teamId })
			.andWhere('user_id=:id', { id: userId })
			.execute();
	}

	async delete(userId: number, teamId: number) {
		await this.teamUserRepository
			.createQueryBuilder()
			.delete()
			.from('team_user')
			.where('team_id=:id', { id: teamId })
			.andWhere('user_id=:id', { id: userId })
			.execute();
	}
}
