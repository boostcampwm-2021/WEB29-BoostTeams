import { Response } from 'express';
import { getCustomRepository } from 'typeorm';

import TeamUserRepository from '@src/repositories/team-user-repository';
import TeamRepository from '@repositories/team-repository';
import UserRepository from '@src/repositories/user-repository';

const TeamController = {
	async create(req: any, res: Response) {
		try {
			const teamRepository = getCustomRepository(TeamRepository);
			const userId = req.user_id;
			const teamId = await teamRepository.create(req.body);
			await this.teamUserRepository.create(userId, teamId);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async read(req: any, res: Response) {
		try {
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const userId = req.user_id;
			console.log(userId);
			const teams = await teamUserRepository.read(userId);
			res.status(200).send(teams);
		} catch (err) {
			res.status(409).send(err);
		}
	},

	async update(req: any, res: Response) {
		try {
			const teamRepository = getCustomRepository(TeamRepository);
			const teamId = req.params.teamId;
			await teamRepository.update(teamId, req.body);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async delete(req: any, res: Response) {
		try {
			const teamRepository = getCustomRepository(TeamRepository);
			const teamId = req.params.teamId;
			await teamRepository.delete(teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async readTeamInfo(req: any, res: Response) {
		try {
			const teamRepository = getCustomRepository(TeamRepository);
			const team = await teamRepository.read(req.params.teamId);
			res.status(200).send(team[0]);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async readTeamUsers(req: any, res: Response) {
		try {
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const teamId = req.params.teamId;
			const teams = await teamUserRepository.readAllUsers(teamId);
			res.status(200).send(teams);
		} catch (err) {
			res.status(409).send(err);
		}
	},

	async invite(req: any, res: Response) {
		try {
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const userRepository = getCustomRepository(UserRepository);
			const teamId = req.params.teamId;
			const userName = req.body.userName;
			const userInfo = await userRepository.getUserByUserName(userName);
			if (!userInfo) res.sendStatus(404);
			const userId = userInfo.user_id;
			const teamUser = await teamUserRepository.checkTeamUser(teamId, userId);
			if (teamUser) res.sendStatus(404);
			await teamUserRepository.invite(userId, teamId);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async acceptInvitation(req: any, res: Response) {
		try {
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const userId = req.user_id;
			const teamId = req.params.teamId;
			await teamUserRepository.update(userId, teamId);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async declineInvitation(req: any, res: Response) {
		try {
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const userId = req.user_id;
			const teamId = req.params.teamId;
			await teamUserRepository.delete(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async kickOut(req: any, res: Response) {
		try {
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const userId = req.params.userId;
			const teamId = req.params.teamId;
			await teamUserRepository.delete(userId, teamId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async changeRole(req: any, res: Response) {
		try {
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const teamId = req.params.teamId;
			const userId = req.params.userId;
			const role = req.body.role;
			await teamUserRepository.changeRole(userId, teamId, role);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	}
};

export default TeamController;
