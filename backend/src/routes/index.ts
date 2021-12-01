import express from 'express';
import authRouter from './auth-router';
import scheduleRouter from './schedule-router';
import teamRouter from './team-router';
import userRouter from './user-router';

const router = express.Router();

router.use('/api/users', userRouter);
router.use('/api/auth', authRouter);
router.use('/api/schedules', scheduleRouter);
router.use('/api/teams', teamRouter);

export default router;
