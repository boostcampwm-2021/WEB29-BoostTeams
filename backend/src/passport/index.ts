import passport from 'passport';
import { githubStrategy } from './github-strategy';
import { localStrategy } from './local-strategy';
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

export const initStrategy = () => {
	githubStrategy();
	localStrategy();
};
