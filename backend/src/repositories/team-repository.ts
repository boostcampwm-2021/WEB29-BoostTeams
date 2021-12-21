import { EntityRepository, AbstractRepository, Transaction, TransactionRepository, Repository } from 'typeorm';
import { Team } from '@entities/team';
import { ITeam } from './types/team';

@EntityRepository(Team)
export default class TeamRepository extends AbstractRepository<Team> {
	async create(teamData: ITeam) {
		const insertResult = await this.repository.createQueryBuilder().insert().values(teamData).execute();
		return insertResult.raw.insertId;
	}

	async read(team_id: number) {
		return await this.repository.createQueryBuilder().select().where(`team_id = :team_id`, { team_id }).execute();
	}

	@Transaction({ isolation: 'SERIALIZABLE' })
	async update(teamId: number, teamData: ITeam, @TransactionRepository(Team) teamRepository?: Repository<Team>) {
		await teamRepository.createQueryBuilder().update().set(teamData).where('team_id=:id', { id: teamId }).execute();
	}

	async delete(teamId: number) {
		await this.repository.createQueryBuilder().delete().where('team_id=:id', { id: teamId }).execute();
	}
}
