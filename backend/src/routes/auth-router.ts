import express from 'express';
import passport from 'passport';

import UserController from '../controllers/user-controller';

import { authenticateToken } from '../token';

const router = express.Router();

router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/'
	}),
	UserController.login
);
router.post('/signup', UserController.createUser);

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github'), UserController.login);

router.get('/info', authenticateToken, UserController.getUser);

export default router;
