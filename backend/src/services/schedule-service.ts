import { getCustomRepository, LessThan, MoreThan } from 'typeorm';
import ScheduleRepository from '../repositories/schedule-repository';

class ScheduleService {
	static instance: ScheduleService;
	scheduleRepository: ScheduleRepository;

	constructor() {
		this.scheduleRepository = getCustomRepository(ScheduleRepository);
	}

	static getInstance(): ScheduleService {
		if (!ScheduleService.instance) {
			ScheduleService.instance = new ScheduleService();
		}
		return ScheduleService.instance;
	}

	async createSchedule(scheduleInfo) {
		const newSchedule = await this.scheduleRepository.save(scheduleInfo);
		return newSchedule;
	}

	async getSchedule(startDate, endDate) {
		const schedules = await this.scheduleRepository.find({
			where: { start_date: MoreThan(startDate), end_date: LessThan(endDate) },
			relations: ['team']
		});

		// teamid로 찾되 team 정보를 포함하지 않으려면 어떻게 할 지
		// const schedules = await this.scheduleRepository
		// 	.createQueryBuilder('schedule')
		// 	.leftJoin('schedule.team_id', 'team')
		// 	.where('schedule.start_date <= :start_date', { start_date: startDate })
		// 	.andWhere('schedule.end_date >= :end_date', { end_date: endDate })
		// 	.getMany();

		return schedules;
	}
}

export default ScheduleService;
