import passport from 'passport';
import GithubStrategy from 'passport-github';

import UserService from '../services/user-service';

const GITHUB_CONFIG = {
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: process.env.GITHUB_CALLBACK_URL
};

const getUserRawData = (userJson) => {
	const user_email = userJson.id;
	const user_password = userJson.node_id;
	const user_name = userJson.name;
	return { user_email, user_password, user_name };
};

async function githubLoginCallback(accessToken, refreshToken, profile, callback) {
	const { user_email, user_password, user_name } = getUserRawData(profile._json);
	let user = await UserService.getInstance().getUserByEmail(user_email);
	if (!user) user = await UserService.getInstance().createUser(user_email, user_password, user_name);
	return callback(null, user);
}

export const githubStrategy = () => passport.use('github', new GithubStrategy(GITHUB_CONFIG, githubLoginCallback));
