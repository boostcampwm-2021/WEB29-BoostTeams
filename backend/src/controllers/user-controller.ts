import { User } from '@entities/user';
import { Request, Response } from 'express';
import { createJWT } from '@middlewares/token';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@src/repositories/user-repository';
import TeamUserRepository from '@src/repositories/team-user-repository';

interface IUser extends Request {
	user_id: number;
}

const UserController = {
	async createUser(req: Request, res: Response) {
		try {
			const userRepository = getCustomRepository(UserRepository);
			const teamUserRepository = getCustomRepository(TeamUserRepository);
			const { userName, userEmail, userPassword } = req.body;
			const emailAlreadyUsed = await userRepository.getUserByEmail(userEmail);
			const nameAlreadyUsed = await userRepository.getUserByName(userName);

			if (emailAlreadyUsed) return res.status(409).json({ conflict: 'email' });
			if (nameAlreadyUsed) return res.status(409).json({ conflict: 'name' });

			const newUser = await userRepository.createUser(userEmail, userPassword, userName);
			await teamUserRepository.invite(newUser.user_id, 1); // 놀이터
			const JWT = createJWT(newUser.user_id);
			res.cookie('JWT', JWT);
			return res.json({ signup: true });
		} catch (err) {
			res.sendStatus(409);
		}
	},
	getUser(req: Request, res: Response) {
		try {
			const user = req.user;
			res.json(user);
		} catch (err) {
			res.sendStatus(401);
		}
	},
	async updateUser(req: IUser, res: Response) {
		try {
			const userRepository = getCustomRepository(UserRepository);
			const existUser = await userRepository.getUserByName(req.body.newName);
			if (existUser) return res.sendStatus(409);
			const newUser = await userRepository.updateUserToName(req.user_id, req.body.newName);
			if (!newUser) return res.sendStatus(409);
			res.status(201).send(newUser);
		} catch (err) {
			res.sendStatus(409);
		}
	},
	login(req: Request, res: Response) {
		try {
			if (req.user === undefined) return res.sendStatus(401);
			const user = req.user as User;
			const JWT = createJWT(user.user_id);
			res.cookie('JWT', JWT);
			res.json(user);
		} catch (err) {
			res.sendStatus(401);
		}
	},
	githubLogin(req: Request, res: Response) {
		if (req.user === undefined) res.sendStatus(404);
		try {
			const user = req.user as User;
			const JWT = createJWT(user.user_id);
			res.cookie('JWT', JWT);
			res.redirect(process.env.FRONT_URL);
		} catch (err) {
			res.sendStatus(404);
		}
	},
	async signout(req: Request, res: Response) {
		try {
			const userRepository = getCustomRepository(UserRepository);
			const user = req.user as User;
			await userRepository.deleteUser(user.user_id);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(401);
		}
	}
};

export default UserController;
