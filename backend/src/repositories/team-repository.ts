import { EntityRepository, Repository } from 'typeorm';
import { Team } from '@entities/team';

@EntityRepository(Team)
export default class TeamRepository extends Repository<Team> {}
