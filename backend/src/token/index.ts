import * as JWT from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
	const requestHeader = req.headers['authorization'];
	const accessToken = requestHeader && requestHeader.split(' ')[1];

	if (!accessToken) req.user = undefined;

	JWT.default.verify(accessToken, process.env.JWT_SECRET_KEY, (err: Error, payload: Number) => {
		if (err) req.user = undefined;
		req.user = payload;
	});

	next();
}

export const createJWT = (user_id: Number) => JWT.default.sign(user_id, process.env.JWT_SECRET_KEY);
