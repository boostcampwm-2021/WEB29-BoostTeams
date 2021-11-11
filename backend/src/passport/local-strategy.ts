import passport from 'passport';
import passportLocal from 'passport-local';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';

import UserService from '../services/user-service';

const LocalStrategy = passportLocal.Strategy;
const LOCAL_CONFIG = {
	usernameField: 'userEmail',
	passwordField: 'encryptedPassword'
};

const localLoginCallback = async (user_email: string, encryptedPassword: string, callback) => {
	const user = await UserService.getInstance().getUserByEmail(user_email);
	const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, process.env.AES_KEY).toString();
	if (!user) return callback(null, user);

	const isValidPassword = bcrypt.compareSync(decryptedPassword, user.user_password);
	if (!isValidPassword) return callback(null, undefined);

	return callback(null, user);
};

export const localStrategy = () => passport.use('local', new LocalStrategy(LOCAL_CONFIG, localLoginCallback));
