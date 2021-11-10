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

	async updateTeam(team: teamInfo) {
		await this.teamUserRepository
			.createQueryBuilder()
			.update('team')
			.set({ team_name: team.team_name, team_desc: team.team_desc })
			.where('team_id=:id', { id: team.team_id })
			.execute();
	}

	async deleteTeam(team: teamInfo) {
		await this.teamUserRepository
			.createQueryBuilder()
			.delete()
			.from('team')
			.where('team_id=:id', { id: team.team_id })
			.execute();
	}

	async getTeam(userId: number) {
		const teams = await this.SelectAllTeam(userId);
		return teams;
	}

	async joinTeam(userId: number, team: teamInfo) {
		// 이미 맴버인 유저한테는 초대 못 보내게 해야 함 / 아니면 서버에서 무시하도록 구현 예정
		// 초대 목록은 DB로 관리? 아니면 localStorage로 관리
		await this.InsertTeamUserRecord(userId, team.team_id);
	}

	async createTeam(userId: number, newTeam: teamInfo) {
		const insertResult = await this.InsertTeamRecord(newTeam);
		const newTeamId = insertResult.raw.insertId;
		await this.InsertTeamUserRecord(userId, newTeamId);
	}

	private async SelectAllTeam(userId: number) {
		return await this.teamUserRepository
			.createQueryBuilder('teamUser')
			.leftJoinAndSelect('teamUser.team', 'team')
			.where('teamUser.user = :userId', { userId })
			.getMany();
	}

	private async InsertTeamRecord(newTeam: teamInfo) {
		const insertResult = await getCustomRepository(TeamRepository)
			.createQueryBuilder('team')
			.insert()
			.into('team')
			.values(newTeam)
			.execute();
		return insertResult.raw.insertId;
	}

	private async InsertTeamUserRecord(userId: number, teamId: number) {
		await this.teamUserRepository
			.createQueryBuilder('team_user')
			.insert()
			.into('team_user')
			.values({
				user: userId,
				team: teamId
			})
			.execute();
	}
}
