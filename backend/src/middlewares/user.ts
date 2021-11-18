import { Response, NextFunction } from 'express';
import UserService from '@services/user-service';

export const getUserInfo = async (req: any, res: Response, next: NextFunction) => {
	const user_id = req.user_id;
	const user = await UserService.getInstance().getUser(user_id);
	if (!user) return res.status(401).send({ msg: 'user not found' });
	req.user = user;
	next();
};
