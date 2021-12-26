import { EntityRepository, AbstractRepository } from 'typeorm';
import { TeamUser } from '@entities/team-user';

@EntityRepository(TeamUser)
export default class TeamUserRepository extends AbstractRepository<TeamUser> {
	async invite(userId: number, teamId: number) {
		await this.repository
			.createQueryBuilder('team_user')
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
		return await this.repository
			.createQueryBuilder('team_user')
			.select()
			.where('team_user.user = :userId', { userId })
			.andWhere('team_user.team = :teamId', { teamId })
			.getOne();
	}

	async create(userId: number, teamId: number) {
		await this.repository
			.createQueryBuilder('team_user')
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
		return await this.repository
			.createQueryBuilder('team_user')
			.leftJoinAndSelect('team_user.team', 'team')
			.where('team_user.user = :userId', { userId })
			.getMany();
	}

	async readAllUsers(teamId: number) {
		return await this.repository
			.createQueryBuilder('team_user')
			.select(['team_user.role', 'User.user_id', 'User.user_name', 'User.user_color', 'User.user_email'])
			.innerJoin('team_user.user', 'User')
			.where('team_user.team=:teamId', { teamId })
			.andWhere('team_user.state=true')
			.getMany();
	}

	async update(userId: number, teamId: number) {
		await this.repository
			.createQueryBuilder('team_user')
			.update()
			.set({ state: true })
			.where('team = :teamId', { teamId })
			.andWhere('user = :userId', { userId })
			.execute();
	}

	async delete(userId: number, teamId: number) {
		await this.repository
			.createQueryBuilder('team_user')
			.delete()
			.from('team_user')
			.where('team = :teamId', { teamId })
			.andWhere('user = :userId', { userId })
			.execute();
	}

	async changeRole(userId: number, teamId: number, role: number) {
		return await this.repository
			.createQueryBuilder('team_user')
			.update()
			.set({ role })
			.where('team = :teamId', { teamId })
			.andWhere('user = :userId', { userId })
			.execute();
	}
}
