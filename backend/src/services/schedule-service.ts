import { getCustomRepository } from 'typeorm';
import ScheduleRepository from '@repositories/schedule-repository';
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
		schedules.push({
			title,
			team_id,
			start_date: new Date(start_date),
			end_date: new Date(end_date),
			content,
			color,
			repeat_id,
			repeat_option
		});
		if (repeat_option !== 0) {
			[...Array(repeat_count - 1)].forEach((v, i) => {
				const startDate = moment(new Date(start_date).toISOString())
					.add(i + 1, addOption[repeat_option])
					.toDate();
				const endDate = moment(new Date(end_date).toISOString())
					.add(i + 1, addOption[repeat_option])
					.toDate();
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
		if (!resultSchedules) throw new Error('일정 생성 실패');
		return resultSchedules;
	}

	async getSchedule(teamId, startDate, endDate) {
		const schedules = await this.scheduleRepository
			.createQueryBuilder('schedule')
			.where('schedule.team_id = :teamId', { teamId })
			.andWhere('schedule.start_date >= :startDate ', { startDate })
			.andWhere('schedule.end_date <= :endDate', { endDate })
			.getMany();
		if (!schedules) throw new Error('일정 가져오기 실패');
		return schedules;
	}

	async deleteSchedule(schedule_id) {
		const deletedSchedule = await this.scheduleRepository.delete({ schedule_id });
		if (!deletedSchedule.affected) throw new Error('일정 삭제 실패');
		return deletedSchedule;
	}

	async updateRepeatSchedule(scheduleInfo) {
		const updatedSchedule = await this.scheduleRepository.save(scheduleInfo);
		if (!updatedSchedule) throw new Error('일정 삭제 실패');
		return updatedSchedule;
	}
}

export default ScheduleService;
