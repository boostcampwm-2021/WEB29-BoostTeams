import passport from 'passport';
import GithubStrategy from 'passport-github';

import { getCustomRepository } from 'typeorm';
import UserRepository from '@src/repositories/user-repository';
import TeamUserRepository from '@src/repositories/team-user-repository';

const GITHUB_CONFIG = {
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: process.env.GITHUB_CALLBACK_URL
};

const getUserRawData = (userJson) => {
	const user_email = userJson.id;
	const user_password = userJson.node_id;
	const github_name = userJson.name;
	const github_id = userJson.login;
	return { user_email, user_password, github_name, github_id };
};

const githubLoginCallback = async (accessToken, refreshToken, profile, callback) => {
	const userRepository = getCustomRepository(UserRepository);
	const teamUserRepository = getCustomRepository(TeamUserRepository);
	const { user_email, user_password, github_name, github_id } = getUserRawData(profile._json);
	let user = await userRepository.getUserByEmail(user_email);
	if (!user) {
		user = await userRepository.createUser(user_email, user_password, github_name, github_id, github_name);
		await teamUserRepository.invite(user.user_id, 1); // 놀이터
	}
	if (user && (github_id !== user.github_id || github_name !== user.github_name))
		userRepository.updateUserToGithub(user.user_id, github_id, github_name);
	return callback(null, user);
};

export const githubStrategy = () => passport.use('github', new GithubStrategy(GITHUB_CONFIG, githubLoginCallback));
