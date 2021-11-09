import { Request, Response } from 'express';
import TeamUserService from '../services/team-user-service';

const TeamUserController = {
	async getTeam(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teams = await TeamUserService.getInstance().getTeamsByUserId(userId);
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
			await TeamUserService.getInstance().createNewTeam(userId, req.body);
			res.status(200).send('creation success');
		} catch (err) {
			res.status(400).send(err);
		}
	},

	async updateTeam(req: Request, res: Response) {
		try {
		} catch (err) {
			res.status(400).send(err);
		}
	},
	async deleteTeam(req: Request, res: Response) {
		try {
		} catch (err) {
			res.status(400).send(err);
		}
	}
};

export default TeamUserController;
