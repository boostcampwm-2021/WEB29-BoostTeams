import passport from 'passport';
import GithubStrategy from 'passport-github';

import UserService from '../services/user-service';

const GITHUB_CONFIG = {
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: 'http://localhost:4000/api/auth/github/callback'
};

async function githubLoginCallback(accessToken, refreshToken, profile, callback) {
	// user_email : id / user_password : node_id / user_name : name
	const { id, node_id, name } = profile._json;
	let user = await UserService.getInstance().getUserByEmail(id);
	console.log(user);
	if (!user) user = await UserService.getInstance().createUser(id, node_id, name);
	return callback(null, user);
}

export const githubStrategy = () => passport.use('github', new GithubStrategy(GITHUB_CONFIG, githubLoginCallback));
