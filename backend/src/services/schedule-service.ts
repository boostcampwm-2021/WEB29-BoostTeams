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
		[...Array(Number(repeat_count))].forEach((v, i) => {
			const startDate = moment(new Date(start_date)).add(i, addOption[repeat_option]).toString();
			const endDate = moment(new Date(end_date)).add(i, addOption[repeat_option]).toString();
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
		const resultSchedules = await Promise.all(
			schedules.map(async (schedule) => this.scheduleRepository.save(schedule))
		);
		console.log(resultSchedules);
		if (!resultSchedules) throw new Error('일정 생성 실패');
		return resultSchedules;
	}

	async getSchedule(teamId, startDate, endDate) {
		const schedules = await this.scheduleRepository.find({
			where: { team_id: teamId, start_date: MoreThan(startDate), end_date: LessThan(endDate) },
			relations: ['team']
		});
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
