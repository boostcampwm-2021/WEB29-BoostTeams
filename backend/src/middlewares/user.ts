import { Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@src/repositories/user-repository';
import TeamUserRepository from '@src/repositories/team-user-repository';

export const getUserInfo = async (req: any, res: Response, next: NextFunction) => {
	const userRepository = getCustomRepository(UserRepository);
	const user_id = req.user_id;
	const user = await userRepository.getUser(user_id);
	if (!user) return res.status(401).send({ msg: 'user not found' });
	req.user = user;
	next();
};

export const checkTeamUser = async (req: any, res: Response, next: NextFunction) => {
	const teamUserRepository = getCustomRepository(TeamUserRepository);
	const userId = req.user_id;
	const teamId = req.params.teamId;
	const teamUser = await teamUserRepository.checkTeamUser(teamId, userId);
	if (!teamUser) return res.status(403).send({ msg: 'you are not member!' });
	next();
};

export const checkIsManager = async (req: any, res: Response, next: NextFunction) => {
	const teamUserRepository = getCustomRepository(TeamUserRepository);
	const userId = req.user_id;
	const teamId = req.params.teamId;
	const teamUser = await teamUserRepository.checkTeamUser(teamId, userId);
	if (!teamUser || teamUser.role !== 0) return res.status(403).send({ msg: 'you are not manager!' });
	next();
};
