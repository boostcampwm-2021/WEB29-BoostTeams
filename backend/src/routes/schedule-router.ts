import express from 'express';
import ScheduleController from '../controllers/schedule-controller';

const router = express.Router();

router.post('/:teamId', ScheduleController.createSchedule);
router.get('/:teamId', ScheduleController.getSchedule);
router.delete('/:scheduleId', ScheduleController.deleteSchedule);

export default router;
