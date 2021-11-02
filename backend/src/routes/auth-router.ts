import express from 'express';
import passport from 'passport';

import UserController from '../controllers/user-controller';

import { authenticateToken } from '../passport/jwt-utils';

const router = express.Router();

router.post('/login', passport.authenticate('local'));
router.post('/login/callback', passport.authenticate('local'), UserController.login);

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github'), UserController.login);

router.get('/signup', UserController.login);

router.post('/info', authenticateToken, UserController.getUser);

export default router;
