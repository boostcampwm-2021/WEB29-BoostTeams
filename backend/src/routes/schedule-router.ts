import express from 'express';
import ScheduleController from '@controllers/schedule-controller';
import { checkTeamUser } from '@src/middlewares/user';

const router = express.Router();

router.post('/:teamId', checkTeamUser, ScheduleController.createSchedule);
router.get('/:teamId', checkTeamUser, ScheduleController.getSchedule);
router.put('/:scheduleId', ScheduleController.updateRepeatSchedule);
router.delete('/:scheduleId', ScheduleController.deleteSchedule);

export default router;
