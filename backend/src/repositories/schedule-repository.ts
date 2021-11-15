import { EntityRepository, Repository } from 'typeorm';
import { Schedule } from '@entities/schedule';

@EntityRepository(Schedule)
export default class ScheduleRepository extends Repository<Schedule> {}
