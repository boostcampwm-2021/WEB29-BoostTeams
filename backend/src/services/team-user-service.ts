import { getCustomRepository } from 'typeorm';
import TeamUserRepository from '../repositories/team-user-repository';
import TeamRepository from '../repositories/team-repository';

interface teamInfo {
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

	async getTeamsByUserId(userId: number) {
		const teams = await this.teamUserRepository
			.createQueryBuilder('teamUser')
			.leftJoinAndSelect('teamUser.team', 'team')
			.where('teamUser.user = :userId', { userId })
			.getMany();
		return teams;
	}

	async createNewTeam(userId: number, newTeam: teamInfo) {
		// team Table에 데이터 삽입
		// team-user-service에서 분리해야 함
		const insertResult = await getCustomRepository(TeamRepository)
			.createQueryBuilder('team')
			.insert()
			.into('team')
			.values(newTeam)
			.execute();
		const newTeamId = insertResult.raw.insertId;
		// team-user Table에 데이터 삽입
		await this.teamUserRepository
			.createQueryBuilder('team_user')
			.insert()
			.into('team_user')
			.values({
				user: userId,
				team: newTeamId
			})
			.execute();
	}
}
