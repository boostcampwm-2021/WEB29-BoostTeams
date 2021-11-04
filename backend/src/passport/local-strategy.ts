import passport from 'passport';
import passportLocal from 'passport-local';

import UserService from '../services/user-service';

import bcrypt from 'bcrypt';

const LocalStrategy = passportLocal.Strategy;
const LOCAL_CONFIG = {
	usernameField: 'user_email',
	passwordField: 'user_password'
};

async function localLoginCallback(user_email, user_password, callback) {
	const user = await UserService.getInstance().getUserByEmail(user_email);
	if (!user) return callback(null, undefined, { reason: 'user does not exist' });

	const isValidPassword = await bcrypt.compare(user_password, user.user_password);
	if (!isValidPassword) return callback(null, undefined, { reason: 'wrong password' });

	return callback(null, user);
}

export const localStrategy = () => passport.use('local', new LocalStrategy(LOCAL_CONFIG, localLoginCallback));
