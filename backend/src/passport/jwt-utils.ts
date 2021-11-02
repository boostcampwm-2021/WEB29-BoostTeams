import * as JWT from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
	const requestHeader = req.headers['authorization'];
	const accessToken = requestHeader && requestHeader.split(' ')[1];
	if (!accessToken) return res.sendStatus(401);
	JWT.default.verify(accessToken, process.env.JWT_SECRET_KEY, (err, payload) => {
		if (err) return res.sendStatus(401);
		req.user = payload;
		next();
	});
}

export const createJWT = (user_id: Number) => JWT.default.sign(user_id, process.env.JWT_SECRET_KEY);
