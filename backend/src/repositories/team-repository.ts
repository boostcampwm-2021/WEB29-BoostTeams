import { EntityRepository, AbstractRepository } from 'typeorm';
import { Team } from '@entities/team';

@EntityRepository(Team)
export default class TeamRepository extends AbstractRepository<Team> {
	async create(teamData: TeamData) {
		const insertResult = await this.repository
			.createQueryBuilder('team')
			.insert()
			.into('team')
			.values(teamData)
			.execute();
		return insertResult.raw.insertId;
	}

	async read(team_id: number) {
		console.log(team_id);
		const result = await this.repository
			.createQueryBuilder('team')
			.select()
			.where(`team_id = :team_id`, { team_id })
			.execute();
		console.log(result);
		return result;
	}

	async update(teamId: number, teamData: TeamData) {
		await this.repository
			.createQueryBuilder('team')
			.update('team')
			.set(teamData)
			.where('team_id=:id', { id: teamId })
			.execute();
	}

	async delete(teamId: number) {
		await this.repository
			.createQueryBuilder('team')
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
