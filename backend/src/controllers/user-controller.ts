import UserService from '@services/user-service';
import { User } from '@entities/user';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { createJWT, createRefreshJWT } from '@middlewares/token';

interface IUser extends Request {
	user_id: number;
}

const ACCESS_TOKEN_DURATION = 1000 * 60 * 15; // 15분
const REFRESH_TOKEN_DURATION = 1000 * 60 * 60 * 24; // 24시간

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
			const ACCESS_TOKEN = createJWT(newUser.user_id);
			const REFRESH_TOKEN = createRefreshJWT(newUser.user_id);
			await UserService.getInstance().setRefreshToken(newUser.user_id, REFRESH_TOKEN);
			res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
					expires: new Date(Date.now() + ACCESS_TOKEN_DURATION)
				})
				.cookie('REFRESH_TOKEN', REFRESH_TOKEN, {
					expires: new Date(Date.now() + REFRESH_TOKEN_DURATION)
				})
				.json({ signup: true });
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
	async login(req: Request, res: Response) {
		try {
			if (req.user === undefined) return res.sendStatus(401);
			const user = req.user as User;
			const ACCESS_TOKEN = createJWT(user.user_id);
			const REFRESH_TOKEN = createRefreshJWT(user.user_id);
			await UserService.getInstance().setRefreshToken(user.user_id, REFRESH_TOKEN);
			res
				.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
					expires: new Date(Date.now() + ACCESS_TOKEN_DURATION)
				})
				.cookie('REFRESH_TOKEN', REFRESH_TOKEN, {
					expires: new Date(Date.now() + REFRESH_TOKEN_DURATION)
				})
				.json(user);
		} catch (err) {
			res.sendStatus(401);
		}
	},
	async githubLogin(req: Request, res: Response) {
		if (req.user === undefined) res.sendStatus(404);
		try {
			const user = req.user as User;
			const ACCESS_TOKEN = createJWT(user.user_id);
			const REFRESH_TOKEN = createRefreshJWT(user.user_id);
			await UserService.getInstance().setRefreshToken(user.user_id, REFRESH_TOKEN);
			res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
				expires: new Date(Date.now() + ACCESS_TOKEN_DURATION)
			})
			.cookie('REFRESH_TOKEN', REFRESH_TOKEN, {
				expires: new Date(Date.now() + REFRESH_TOKEN_DURATION)
			})
			.redirect(process.env.FRONT_URL);
		} catch (err) {
			res.sendStatus(404);
		}
	},

	async refreshToken (req: Request, res: Response) {
		const requestHeader = req.headers['authorization'];
		const refreshToken = requestHeader && requestHeader.split(' ')[1];
		if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') 
			return res.status(401).send({ msg: 'undefined JWT' });
		const user_id = JSON.parse(JSON.stringify(jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY))).user_id;
		if (!user_id) 
			return res.status(401).send({ msg: 'invalid JWT' });
		const accessToken = createJWT(Number(user_id));
		res.cookie('ACCESS_TOKEN', accessToken, {expires: new Date(Date.now() + ACCESS_TOKEN_DURATION)});
		res.sendStatus(200);
	},
};

export default UserController;
