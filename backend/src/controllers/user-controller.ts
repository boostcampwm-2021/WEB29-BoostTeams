import UserService from '../services/user-service';
import { Request, Response } from 'express';

const UserController = {
	async createUser(req: Request, res: Response) {
		const { user_email, user_password, user_name } = req.params;
		try {
			const newUser = await UserService.getInstance().createUser(user_email, user_password, user_name);
			res.status(200).send(newUser);
		} catch (err) {
			console.error(err);
		}
	},
	async getUser(req: Request, res: Response) {
		const { user_id } = req.params;
		try {
			const user = await UserService.getInstance().getUser(Number(user_id));
			res.status(200).send(user);
		} catch (err) {
			console.error(err);
		}
	}
};

export default UserController;
