import { getCustomRepository } from 'typeorm';
import ScheduleRepository from '@repositories/schedule-repository';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { ScheduleCreateReqType } from '@src/customeTypes/schedule';

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

	async createSchedule(scheduleInfo: ScheduleCreateReqType) {
		const schedules = generateRepeatSchedules(scheduleInfo);
		const resultSchedules = await Promise.all(
			schedules.map(async (schedule) => this.scheduleRepository.save(schedule))
		);
		if (!resultSchedules) throw new Error('일정 생성 실패');
		return resultSchedules;
	}

	async getSchedule(teamId: number, startDate: string, endDate: string) {
		const schedules = await this.scheduleRepository
			.createQueryBuilder('schedule')
			.where('schedule.team_id = :teamId', { teamId })
			.andWhere('schedule.start_date >= :startDate ', { startDate })
			.andWhere('schedule.end_date <= :endDate', { endDate })
			.getMany();
		if (!schedules) throw new Error('일정 가져오기 실패');
		return schedules;
	}

	async deleteSchedule(scheduleId: number) {
		const deletedSchedule = await this.scheduleRepository
			.createQueryBuilder()
			.delete()
			.from('schedule')
			.where('schedule_id = :scheduleId', { scheduleId })
			.execute();
		if (!deletedSchedule) throw new Error('일정 삭제 실패');
		return deletedSchedule;
	}

	async updateRepeatSchedule(scheduleInfo) {
		const updatedSchedule = await this.scheduleRepository.save(scheduleInfo);
		if (!updatedSchedule) throw new Error('일정 업데이트 실패');
		return updatedSchedule;
	}
}

const addOption = {
	1: 'days',
	2: 'weeks',
	3: 'months'
};

const generateRepeatSchedules = ({
	title,
	team_id,
	start_date,
	end_date,
	repeat_option,
	repeat_count,
	content,
	color
}) => {
	const schedules = [];
	const repeat_id = uuidv4();
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
	if (repeat_option === 0) return schedules;
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
	return schedules;
};

export default ScheduleService;
