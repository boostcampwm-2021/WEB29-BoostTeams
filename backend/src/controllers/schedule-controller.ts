import { Request, Response } from 'express';
import moment from 'moment';
import ScheduleService from '../services/schedule-service';

const changeFieldToNumber = (teamID, newScheduleData) => {
	newScheduleData.team_id = Number(teamID);
	newScheduleData.color = Number(newScheduleData.color);
	return newScheduleData;
};

const ScheduleController = {
	async createSchedule(req: Request, res: Response) {
		try {
			const scheduleInfo = changeFieldToNumber(req.params.teamId, req.body);
			const newSchedule = await ScheduleService.getInstance().createSchedule(scheduleInfo);
			res.status(201).json(newSchedule);
		} catch (err) {
			res.sendStatus(409);
		}
	},
	async getSchedule(req: Request, res: Response) {
		try {
			const { start_date, end_date }: { start_date?: string; end_date?: string } = req.query;
			const team_id = Number(req.params.teamId);
			const startDate = moment(start_date, 'YYYYMMDD').format('YYYY-MM-DD');
			const endDate = moment(end_date, 'YYYYMMDD').format('YYYY-MM-DD');
			const schedules = await ScheduleService.getInstance().getSchedule(team_id, startDate, endDate);
			res.json(schedules);
		} catch (err) {
			res.sendStatus(404);
		}
	},
	async deleteSchedule(req: Request, res: Response) {
		try {
			const scheduleId = Number(req.params.scheduleId);
			await ScheduleService.getInstance().deleteSchedule(scheduleId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},
	async updateRepeatSchedule(req: Request, res: Response) {
		try {
			const newSchedule = await ScheduleService.getInstance().updateRepeatSchedule(req.body);
			res.json(newSchedule);
		} catch (err) {
			res.sendStatus(409);
		}
	}
};

export default ScheduleController;
