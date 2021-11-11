import { EntityRepository, Repository } from 'typeorm';
import { Postit } from '../entities/postit';

@EntityRepository(Postit)
export default class PostitRepository extends Repository<Postit> {}
