import { Request, Response } from 'express';
import moment from 'moment';
import ScheduleService from '@services/schedule-service';

const ScheduleController = {
	async createSchedule(req: Request, res: Response) {
		try {
			const newSchedule = await ScheduleService.getInstance().createSchedule(req.body);
			res.json(newSchedule);
		} catch (err) {
			res.sendStatus(409);
		}
	},
	async getSchedule(req: Request, res: Response) {
		try {
			const { team_id, start_date, end_date }: { team_id?: string; start_date?: string; end_date?: string } = req.query;
			const startDate = moment(start_date, 'YYYYMMDD').format('YYYY-MM-DD');
			const endDate = moment(end_date, 'YYYYMMDD').format('YYYY-MM-DD');
			const schedules = await ScheduleService.getInstance().getSchedule(Number(team_id), startDate, endDate);
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
