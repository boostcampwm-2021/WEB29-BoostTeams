import express from 'express';
import passport from 'passport';

import UserController from '@controllers/user-controller';

import { authenticateToken } from '@middlewares/token';
import { getUserInfo } from '@middlewares/user';

const router = express.Router();

router.post('/login', passport.authenticate('local'), UserController.login);
router.post('/signup', UserController.createUser);

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github'), UserController.githubLogin);

router.get('/info', authenticateToken, getUserInfo, UserController.getUser);

router.post('/refresh-token', UserController.refreshToken);

export default router;
