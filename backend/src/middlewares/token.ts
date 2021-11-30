import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
	const requestHeader = req.headers['authorization'];
	const accessToken = requestHeader && requestHeader.split(' ')[1];
	if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
		return res.status(401).send({ msg: 'undefined JWT' });
	}
	try {
		const user_id = JSON.parse(JSON.stringify(jwt.verify(accessToken, process.env.JWT_SECRET_KEY))).user_id;
		req.user_id = Number(user_id);
	next();
	} catch (e) {
		return res.status(401).send({ msg: 'invalid JWT' });
	}
};

export const createJWT = (user_id: any) => jwt.sign({user_id}, process.env.JWT_SECRET_KEY, {expiresIn : '15m'});
export const createRefreshJWT = (user_id: any) => jwt.sign({user_id}, process.env.JWT_REFRESH_KEY, {expiresIn : '1d'});
