import { Request, Response } from 'express';
import TeamUserService from '../services/team-user-service';
import { parseUserId } from '../utils/helper';

const TeamUserController = {
	async getTeams(req: Request, res: Response) {
		try {
			const userId = parseUserId(req.path);
			const teams = await TeamUserService.getInstance().getTeamsByUserId(userId);
			res.status(200).send(teams);
		} catch (err) {
			res.status(400).send(err);
		}
	}
};

export default TeamUserController;
