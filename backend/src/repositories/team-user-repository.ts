import { EntityRepository, Repository } from 'typeorm';
import { TeamUser } from '@entities/team-user';

@EntityRepository(TeamUser)
export default class TeamUserRepository extends Repository<TeamUser> {}
