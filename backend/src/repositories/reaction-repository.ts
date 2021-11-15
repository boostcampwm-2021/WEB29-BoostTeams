import { EntityRepository, Repository } from 'typeorm';
import { Reaction } from '@entities/reaction';

@EntityRepository(Reaction)
export default class ReactionRepository extends Repository<Reaction> {}
