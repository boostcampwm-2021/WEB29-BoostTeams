import passport from 'passport';
import GithubStrategy from 'passport-github';
import UserService from '../services/user-service';

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

const GITHUB_CONFIG = {
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRTE,
	callbackURL: 'http://localhost:4000/api/auth/github/callback'
};

async function githubLoginCallback(accessToken, refreshToken, profile, callback) {
	const { id, node_id, name } = profile._json;
	// user_email : id / user_password : node_id / user_name : name
	let user = await UserService.getInstance().getUserByEmail(id);
	if (!user) user = await UserService.getInstance().createUser(id, node_id, name);
	return callback(null, user);
}

export const githubStrategy = () => {
	passport.use('github', new GithubStrategy(GITHUB_CONFIG, githubLoginCallback));
};
