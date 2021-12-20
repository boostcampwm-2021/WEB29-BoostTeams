import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import { getCustomRepository } from 'typeorm';
import UserRepository from '@src/repositories/user-repository';

const LocalStrategy = passportLocal.Strategy;
const LOCAL_CONFIG = {
	usernameField: 'userEmail',
	passwordField: 'userPassword'
};

const localLoginCallback = async (user_email: string, userPassword: string, callback) => {
	const userRepository = getCustomRepository(UserRepository);

	const user = await userRepository.getUserByEmail(user_email);
	if (!user) return callback(null, user);

	const isValidPassword = bcrypt.compareSync(userPassword, user.user_password);
	if (!isValidPassword) return callback(null, undefined);

	return callback(null, user);
};

export const localStrategy = () => passport.use('local', new LocalStrategy(LOCAL_CONFIG, localLoginCallback));
