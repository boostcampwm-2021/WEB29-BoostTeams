import express from 'express';
import ScheduleController from '@controllers/schedule-controller';
import { checkTeamUser } from '@src/middlewares/user';

const router = express.Router();

router.post('/:teamId', checkTeamUser, ScheduleController.createSchedule);
router.get('/:teamId', checkTeamUser, ScheduleController.getSchedule);
router.put('/:scheduleId', checkTeamUser, ScheduleController.updateRepeatSchedule);
router.delete('/:scheduleId', checkTeamUser, ScheduleController.deleteSchedule);

export default router;
