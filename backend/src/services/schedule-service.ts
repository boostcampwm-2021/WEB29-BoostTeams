import { getCustomRepository, LessThan, MoreThan } from 'typeorm';
import ScheduleRepository from '../repositories/schedule-repository';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const addOption = {
	1: 'days',
	2: 'weeks',
	3: 'months'
};

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
		const schedules = [];
		const repeat_id = uuidv4();
		const { title, team_id, start_date, end_date, repeat_option, repeat_count, content, color } = scheduleInfo;
		schedules.push({ title, team_id, start_date, end_date, content, color, repeat_id, repeat_option });
		if (repeat_option !== 0) {
			[...Array(repeat_count - 1)].forEach((v, i) => {
				const startDate = moment(new Date(start_date))
					.add(i + 1, addOption[repeat_option])
					.toString();
				const endDate = moment(new Date(end_date))
					.add(i + 1, addOption[repeat_option])
					.toString();
				schedules.push({
					title,
					team_id,
					start_date: startDate,
					end_date: endDate,
					content,
					color,
					repeat_id,
					repeat_option
				});
			});
		}
		const resultSchedules = await Promise.all(
			schedules.map(async (schedule) => this.scheduleRepository.save(schedule))
		);

		return resultSchedules;
	}

	async getSchedule(teamId, startDate, endDate) {
		const schedules = await this.scheduleRepository.find({
			where: { team_id: teamId, start_date: MoreThan(startDate), end_date: LessThan(endDate) },
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

	async deleteSchedule(schedule_id) {
		const deleted = await this.scheduleRepository.delete({ schedule_id });
		return deleted;
	}

	async updateRepeatSchedule(scheduleInfo) {
		const result = await this.scheduleRepository.save(scheduleInfo);
		return result;
	}
}

export default ScheduleService;
