import { Response } from 'express';
import TeamUserService from '@services/team-user-service';
import TeamService from '@services/team-service';
import UserService from '@services/user-service';

const TeamController = {
	async create(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teamId = await TeamService.getInstance().create(req.body);
			await TeamUserService.getInstance().create(userId, teamId);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async read(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teams = await TeamUserService.getInstance().read(userId);
			res.status(200).send(teams);
		} catch (err) {
			res.status(409).send(err);
		}
	},

	async update(req: any, res: Response) {
		try {
			const teamId = req.params.teamId;
			await TeamService.getInstance().update(teamId, req.body);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async delete(req: any, res: Response) {
		try {
			const teamId = req.params.teamId;
			await TeamService.getInstance().delete(teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async readTeamInfo(req: any, res: Response) {
		try {
			const team = await TeamService.getInstance().read(req.params.teamId);
			res.status(200).send(team[0]);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async readTeamUsers(req: any, res: Response) {
		try {
			const teamId = req.params.teamId;
			const teams = await TeamUserService.getInstance().readAllUsers(teamId);
			res.status(200).send(teams);
		} catch (err) {
			res.status(409).send(err);
		}
	},

	async invite(req: any, res: Response) {
		try {
			const teamId = req.params.teamId;
			const userName = req.body.userName;
			const userInfo = await UserService.getInstance().getUserByUserName(userName);
			if (!userInfo) res.sendStatus(404);
			const userId = userInfo.user_id;
			const teamUser = await TeamUserService.getInstance().checkTeamUser(teamId, userId);
			if (teamUser) res.sendStatus(404);
			await TeamUserService.getInstance().invite(userId, teamId);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async acceptInvitation(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teamId = req.params.teamId;
			await TeamUserService.getInstance().update(userId, teamId);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async declineInvitation(req: any, res: Response) {
		try {
			const userId = req.user_id;
			const teamId = req.params.teamId;
			await TeamUserService.getInstance().delete(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async kickOut(req: any, res: Response) {
		try {
			const userId = req.params.userId;
			const teamId = req.params.teamId;
			await TeamUserService.getInstance().delete(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async changeRole(req: any, res: Response) {
		try {
			const teamId = req.params.teamId;
			const userId = req.params.userId;
			const role = req.body.role;
			await TeamUserService.getInstance().changeRole(userId, teamId, role);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	}
};

export default TeamController;
