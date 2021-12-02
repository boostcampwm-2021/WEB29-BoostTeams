import UserService from '@services/user-service';
import TeamUserService from '@services/team-user-service';
import { User } from '@entities/user';

import { Request, Response } from 'express';
import { createJWT } from '@middlewares/token';

interface IUser extends Request {
	user_id: number;
}

const UserController = {
	async createUser(req: Request, res: Response) {
		try {
			const { userName, userEmail, userPassword } = req.body;
			const emailAlreadyUsed = await UserService.getInstance().getUserByEmail(userEmail);
			const nameAlreadyUsed = await UserService.getInstance().getUserByName(userName);

			if (emailAlreadyUsed) return res.status(409).json({ conflict: 'email' });
			if (nameAlreadyUsed) return res.status(409).json({ conflict: 'name' });

			const newUser = await UserService.getInstance().createUser(userEmail, userPassword, userName);
			await TeamUserService.getInstance().invite(newUser.user_id, 1); // 놀이터
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
			const existUser = await UserService.getInstance().getUserByName(req.body.newName);
			if (existUser) return res.sendStatus(409);
			const newUser = await UserService.getInstance().updateUserToName(req.user_id, req.body.newName);
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
			const user = req.user as User;
			await UserService.getInstance().deleteUser(user.user_id);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(401);
		}
	}
};

export default UserController;
