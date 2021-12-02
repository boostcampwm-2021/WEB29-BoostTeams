import express from 'express';
import ScheduleController from '@controllers/schedule-controller';
import { checkTeamUser } from '@src/middlewares/user';
import { authenticateToken } from '@src/middlewares/token';

const router = express.Router();

router.post('/:teamId', authenticateToken, checkTeamUser, ScheduleController.createSchedule);
router.get('/:teamId', authenticateToken, checkTeamUser, ScheduleController.getSchedule);
router.put('/:scheduleId', ScheduleController.updateRepeatSchedule);
router.delete('/:scheduleId', ScheduleController.deleteSchedule);

export default router;
