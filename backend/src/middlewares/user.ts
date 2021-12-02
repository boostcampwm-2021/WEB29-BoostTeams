import { Response, NextFunction } from 'express';
import UserService from '@services/user-service';
import TeamUserService from '@src/services/team-user-service';

export const getUserInfo = async (req: any, res: Response, next: NextFunction) => {
	const user_id = req.user_id;
	const user = await UserService.getInstance().getUser(user_id);
	if (!user) return res.status(401).send({ msg: 'user not found' });
	req.user = user;
	next();
};

export const checkTeamUser = async (req: any, res: Response, next: NextFunction) => {
	const userId = req.user_id;
	const teamId = req.params.teamId;
	const teamUser = await TeamUserService.getInstance().checkTeamUser(teamId, userId);
	if (!teamUser) return res.status(403).send({ msg: 'you are not member!' });
	next();
};

export const checkIsManager = async (req: any, res: Response, next: NextFunction) => {
	const userId = req.user_id;
	const teamId = req.params.teamId;
	const teamUser = await TeamUserService.getInstance().checkTeamUser(teamId, userId);
	if (!teamUser || teamUser.role !== 0) return res.status(403).send({ msg: 'you are not manager!' });
	next();
};
