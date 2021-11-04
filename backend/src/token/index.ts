import { Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';

export function authenticateToken(req: any, res: Response, next) {
	const requestHeader = req.headers['authorization'];
	const accessToken = requestHeader && requestHeader.split(' ')[1];

	if (!accessToken) req.user = undefined;

	JWT.default.verify(accessToken, process.env.JWT_SECRET_KEY, (err: Error, payload: number) => {
		if (err) req.user_id = undefined;
		req.user_id = payload;
	});

	next();
}

export const createJWT = (user_id: number) => JWT.default.sign(user_id, process.env.JWT_SECRET_KEY);
