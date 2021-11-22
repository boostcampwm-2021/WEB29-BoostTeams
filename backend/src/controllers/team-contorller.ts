import { Response } from 'express';
import TeamUserService from '@services/team-user-service';
import TeamService from '@services/team-service';
import UserService from '@services/user-service';

const TeamController = {
	async read(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teams = await TeamUserService.getInstance().read(userId);
			res.status(200).send(teams);
		} catch (err) {
			res.status(404).send(err);
		}
	},

	async readTeamInfo(req: any, res: Response) {
		try {
			const team = await TeamService.getInstance().read(req.params.id);
			res.status(200).send(team);
		} catch (err) {
			res.status(404).send(err);
		}
	},

	async readTeamUsers(req: any, res: Response) {
		try {
			const teams = await TeamUserService.getInstance().readAllUsers(req.params.id);
			res.status(200).send(teams);
		} catch (err) {
			res.status(404).send(err);
		}
	},

	async create(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teamId = await TeamService.getInstance().create(req.body);
			await TeamUserService.getInstance().create(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async delete(req: any, res: Response) {
		try {
			const teamId = req.body.team_id;
			await TeamService.getInstance().delete(teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async update(req: any, res: Response) {
		try {
			await TeamService.getInstance().update(req.body);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async invite(req: any, res: Response) {
		try {
			const { user_name, team_id } = req.body;
			const userInfo = await UserService.getInstance().getUserByUserName(user_name);
			const userId = userInfo.user_id;
			await TeamUserService.getInstance().invite(userId, team_id);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(204);
		}
	},

	async acceptInvitation(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teamId = req.body.team_id;
			await TeamUserService.getInstance().update(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async declineInvitation(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teamId = req.body.team_id;
			await TeamUserService.getInstance().delete(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async kickOut(req: any, res: Response) {
		try {
			const userId = req.params.id;
			const teamId = req.body.team_id;
			await TeamUserService.getInstance().delete(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	}
};

export default TeamController;
