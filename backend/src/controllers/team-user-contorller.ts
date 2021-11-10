import { Request, Response } from 'express';
import TeamUserService from '../services/team-user-service';

const TeamUserController = {
	async getTeam(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teams = await TeamUserService.getInstance().getTeam(userId);
			res.status(200).send(teams);
		} catch (err) {
			res.status(400).send(err);
		}
	},

	async joinTeam(req: any, res: Response) {
		try {
			const userId = req.user_id;
			await TeamUserService.getInstance().joinTeam(userId, req.body);
			res.status(200).send('good');
		} catch (err) {
			res.status(400).send(err);
		}
	},

	async createTeam(req: any, res: Response) {
		try {
			const userId = req.user_id;
			await TeamUserService.getInstance().createTeam(userId, req.body);
			res.status(200).send('creation success');
		} catch (err) {
			res.status(400).send(err);
		}
	},

	async updateTeam(req: any, res: Response) {
		try {
			console.log(req.body);
			await TeamUserService.getInstance().updateTeam(req.body);
			res.status(200).send('update success');
		} catch (err) {
			res.status(400).send(err);
		}
	},
	async deleteTeam(req: any, res: Response) {
		try {
			await TeamUserService.getInstance().deleteTeam(req.body);
			res.status(200).send('delete success');
		} catch (err) {
			res.status(400).send(err);
		}
	}
};

export default TeamUserController;
