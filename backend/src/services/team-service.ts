import { getCustomRepository } from 'typeorm';
import TeamRepository from '../repositories/team-repository';

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
		try {
			const insertResult = await getCustomRepository(TeamRepository)
				.createQueryBuilder('team')
				.insert()
				.into('team')
				.values(teamData)
				.execute();
			return insertResult.raw.insertId;
		} catch (err) {
			throw err;
		}
	}

	async read(teamId: number) {
		try {
			return await this.teamRepository.createQueryBuilder('team').where('team_id=:id', { id: teamId });
		} catch (err) {
			throw err;
		}
	}

	async update(teamData: TeamData) {
		try {
			await this.teamRepository
				.createQueryBuilder()
				.update('team')
				.set(teamData)
				.where('team_id=:id', { id: teamData.team_id })
				.execute();
		} catch (err) {
			throw err;
		}
	}

	async delete(teamId: number) {
		try {
			await this.teamRepository
				.createQueryBuilder()
				.delete()
				.from('team')
				.where('team_id=:id', { id: teamId })
				.execute();
		} catch (err) {
			throw err;
		}
	}
}

interface TeamData {
	team_id?: number;
	team_name: string;
	team_desc: string;
}
