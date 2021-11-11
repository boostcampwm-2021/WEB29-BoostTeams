import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
	const requestHeader = req.headers['authorization'];
	const accessToken = requestHeader && requestHeader.split(' ')[1];

	if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
		return res.status(401).send({ msg: 'undefined JWT' });
	}

	const user_id = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

	if (!user_id) {
		return res.status(401).send({ msg: 'invalid JWT' });
	}

	req.user_id = Number(user_id);
	next();
};

export const createJWT = (user_id: number) => jwt.sign(`${user_id}`, process.env.JWT_SECRET_KEY);
