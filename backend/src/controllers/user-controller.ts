import UserService from '../services/user-service';
import { User } from '../entities/user';

import { Request, Response } from 'express';
import { createJWT } from '../token';

import { getUserName } from './utils';

const UserController = {
	async createUser(req: Request, res: Response) {
		try {
			const { user_email, encryptedPassword } = req.body;

			const emailAlreadyUsed = await UserService.getInstance().getUserByEmail(user_email);
			if (emailAlreadyUsed) return res.send('email is already in use');

			const user_name = getUserName(user_email);

			const newUser = await UserService.getInstance().createUser(user_email, encryptedPassword, user_name);
			const JWT = createJWT(newUser.user_id);
			res.cookie('JWT', JWT);
			res.redirect(process.env.FRONT_URL);
		} catch (err) {
			res.send(err);
		}
	},
	async getUser(req: any, res: Response) {
		try {
			const user_id = req.user_id;
			const user = await UserService.getInstance().getUser(user_id);
			res.status(200).send(user);
		} catch (err) {
			res.send(err);
		}
	},
	login(req: Request, res: Response) {
		if (req.user === undefined) res.send('user not found');
		try {
			const user = req.user as User;
			const JWT = createJWT(user.user_id);
			res.cookie('JWT', JWT);
			res.redirect(process.env.FRONT_URL);
		} catch (err) {
			res.send(err);
		}
	}
};

export default UserController;
