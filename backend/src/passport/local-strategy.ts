import passport from 'passport';
import passportLocal from 'passport-local';

import UserService from '../services/user-service';

const LocalStrategy = passportLocal.Strategy;
const LOCAL_CONFIG = {
	usernameField: 'user_email',
	passwordField: 'user_password'
};

async function localLoginCallback(user_email: string, user_password: string, callback) {
	const user = await UserService.getInstance().getUserByEmail(user_email);
	if (!user) return callback(null, undefined, { reason: 'user does not exist' });

	const isValidPassword = user_password === user.user_password;
	if (!isValidPassword) return callback(null, undefined, { reason: 'wrong password' });

	return callback(null, user);
}

export const localStrategy = () => passport.use('local', new LocalStrategy(LOCAL_CONFIG, localLoginCallback));
