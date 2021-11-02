import UserService from '../services/user-service';
import { Request, Response } from 'express';
import { createJWT } from '../passport/jwt-utils';
import { User } from '../entities/user';

const UserController = {
	async createUser(req: Request, res: Response) {
		const { user_email, user_password, user_name } = req.body;
		try {
			const newUser = await UserService.getInstance().createUser(user_email, user_password, user_name);
			res.status(200).send(newUser);
		} catch (err) {
			console.error(err);
		}
	},
	async getUser(req: Request, res: Response) {
		const { user_id } = req.query;
		try {
			const user = await UserService.getInstance().getUser(Number(user_id));
			res.status(200).send(user);
		} catch (err) {
			console.error(err);
		}
	},
	login(req: Request, res: Response) {
		const user = req.user as User;
		const JWT = createJWT(user.user_id);
		res.json(JWT);
	}
};

export default UserController;
