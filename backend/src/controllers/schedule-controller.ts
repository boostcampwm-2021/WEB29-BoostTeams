import { Request, Response } from 'express';
import moment from 'moment';
import ScheduleService from '../services/schedule-service';

const ScheduleController = {
	async createSchedule(req: Request, res: Response) {
		try {
			const scheduleInfo = JSON.parse(JSON.stringify(req.body));
			scheduleInfo.team_id = Number(req.params.teamId);
			const newSchedule = await ScheduleService.getInstance().createSchedule(scheduleInfo);
			res.status(200).send(newSchedule);
		} catch (err) {
			res.send(err);
		}
	},
	async getSchedule(req: Request, res: Response) {
		try {
			const { start_date, end_date }: { start_date?: string; end_date?: string } = req.query;
			const startDate = moment(start_date, 'YYYYMMDD').format('YYYY-MM-DD');
			const endDate = moment(end_date, 'YYYYMMDD').format('YYYY-MM-DD');
			const schedules = await ScheduleService.getInstance().getSchedule(startDate, endDate);
			res.status(200).send(schedules);
		} catch (err) {
			res.send(err);
		}
	}
};

export default ScheduleController;
