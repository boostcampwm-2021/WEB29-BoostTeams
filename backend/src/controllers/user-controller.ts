import UserService from '../services/user-service';
import { User } from '../entities/user';

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createJWT } from '../token';

import { getUserName, SALT_OR_ROUND } from './utils';

const UserController = {
	async createUser(req: Request, res: Response) {
		try {
			const { user_email, user_password } = req.body;

			const emailAlreadyUsed = await UserService.getInstance().getUserByEmail(user_email);
			if (emailAlreadyUsed) return res.send('email is already in use');

			const user_name = getUserName(user_email); // FE에서 ? BE에서?
			const encryptedPassword = bcrypt.hashSync(user_password, SALT_OR_ROUND);

			const newUser = await UserService.getInstance().createUser(user_email, encryptedPassword, user_name);
			const JWT = createJWT(newUser.user_id);
			res.status(200).send(JWT);
		} catch (err) {
			res.send(err);
		}
	},
	async getUser(req: Request, res: Response) {
		try {
			const targetUser = req.user as User;
			const user = await UserService.getInstance().getUser(targetUser.user_id);
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
			res.status(200).send(JWT);
		} catch (err) {
			res.send(err);
		}
	}
};

export default UserController;
