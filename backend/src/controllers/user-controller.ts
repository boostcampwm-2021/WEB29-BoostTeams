import UserService from '../services/user-service';
import { User } from '../entities/user';

import { Request, Response } from 'express';
import { createJWT } from '../middlewares/token';

interface IUser extends Request {
	user_id: number;
}

const UserController = {
	async createUser(req: Request, res: Response) {
		try {
			const { userName, userEmail, encryptedPassword } = req.body;
			const emailAlreadyUsed = await UserService.getInstance().getUserByEmail(userEmail);
			const nameAlreadyUsed = await UserService.getInstance().getUserByName(userName);

			if (emailAlreadyUsed) return res.status(409).json({ conflict: 'email' });
			if (nameAlreadyUsed) return res.status(409).json({ conflict: 'name' });

			const newUser = await UserService.getInstance().createUser(userEmail, encryptedPassword, userName);
			const JWT = createJWT(newUser.user_id);
			res.cookie('JWT', JWT);

			res.status(201).json({ msg: 'create user success' });
		} catch (err) {
			console.error(err);
			res.sendStatus(404);
		}
	},
	getUser(req: Request, res: Response) {
		try {
			const user = req.user;
			res.status(200).json(user);
		} catch (err) {
			console.error(err);
			res.sendStatus(404);
		}
	},
	async updateUser(req: IUser, res: Response) {
		try {
			const existUser = await UserService.getInstance().getUserByName(req.body.newName);
			if (existUser) return res.status(409).json({ msg: 'user has existed' });
			const newUser = await UserService.getInstance().updateUserToName(req.user_id, req.body.newName);
			if (!newUser) return res.status(401).json({ msg: 'user not found' });
			res.status(200).json({ msg: 'update user success' });
		} catch (err) {
			console.error(err);
			res.sendStatus(404);
		}
	},
	login(req: Request, res: Response) {
		if (req.user === undefined) res.status(401).json({ msg: 'user not found' });
		try {
			const user = req.user as User;
			const JWT = createJWT(user.user_id);
			res.cookie('JWT', JWT);
			res.status(200).json({ msg: 'login success' });
		} catch (err) {
			console.error(err);
			res.sendStatus(404);
		}
	},
	githubLogin(req: Request, res: Response) {
		if (req.user === undefined) res.status(401).json({ msg: 'error!' });
		try {
			const user = req.user as User;
			const JWT = createJWT(user.user_id);
			res.cookie('JWT', JWT);
			res.redirect(process.env.FRONT_URL);
		} catch (err) {
			console.error(err);
			res.sendStatus(404);
		}
	}
};

export default UserController;
