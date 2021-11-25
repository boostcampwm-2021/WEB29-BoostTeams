import { getCustomRepository } from 'typeorm';
import TeamRepository from '@repositories/team-repository';

export default class TeamService {
	static instance: TeamService;
	teamRepository: TeamRepository;

	constructor() {
		this.teamRepository = getCustomRepository(TeamRepository);
	}

	static getInstance(): TeamService {
		if (!TeamService.instance) {
			TeamService.instance = new TeamService();
		}
		return TeamService.instance;
	}

	async create(teamData: TeamData) {
		const insertResult = await getCustomRepository(TeamRepository)
			.createQueryBuilder('team')
			.insert()
			.into('team')
			.values(teamData)
			.execute();
		return insertResult.raw.insertId;
	}

	async read(team_id: number) {
		const result = await this.teamRepository.find({ where: { team_id } });
		return result;
	}

	async update(teamId: number, teamData: TeamData) {
		await this.teamRepository
			.createQueryBuilder()
			.update('team')
			.set(teamData)
			.where('team_id=:id', { id: teamId })
			.execute();
	}

	async delete(teamId: number) {
		await this.teamRepository
			.createQueryBuilder()
			.delete()
			.from('team')
			.where('team_id=:id', { id: teamId })
			.execute();
	}
}

interface TeamData {
	team_id?: number;
	team_name: string;
	team_desc: string;
}
