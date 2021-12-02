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

	async invite(userId: number, teamId: number) {
		await this.teamUserRepository
			.createQueryBuilder()
			.insert()
			.into('team_user')
			.values({
				user: userId,
				team: teamId,
				state: false,
				role: 1
			})
			.execute();
	}

	async checkTeamUser(teamId: number, userId: number) {
		return await this.teamUserRepository
			.createQueryBuilder('team_user')
			.where('team_user.user = :userId', { userId })
			.andWhere('team_user.team = :teamId', { teamId })
			.getOne();
	}

	async create(userId: number, teamId: number) {
		await this.teamUserRepository
			.createQueryBuilder()
			.insert()
			.into('team_user')
			.values({
				user: userId,
				team: teamId,
				state: true,
				role: 0
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

	async readAllUsers(teamId: number) {
		return await this.teamUserRepository
			.createQueryBuilder('team_user')
			.select('team_user.role')
			.addSelect('user.user_id')
			.addSelect('user.user_name')
			.addSelect('user.user_color')
			.addSelect('user.user_email')
			.innerJoin('team_user.user', 'user')
			.where('team_user.team = :teamId', { teamId })
			.andWhere('team_user.state =:state', { state: true })
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

	async changeRole(userId: number, teamId: number, role: number) {
		return await this.teamUserRepository
			.createQueryBuilder()
			.update()
			.set({ role })
			.where('team = :teamId', { teamId })
			.andWhere('user = :userId', { userId })
			.execute();
	}
}
