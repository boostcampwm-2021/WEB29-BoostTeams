import express from 'express';
import ScheduleController from '@controllers/schedule-controller';
import { authenticateToken } from '@src/middlewares/token';

const router = express.Router();

router.post('/', authenticateToken, ScheduleController.createSchedule);
router.get('/', authenticateToken, ScheduleController.getSchedule);
router.put('/:scheduleId', authenticateToken, ScheduleController.updateRepeatSchedule);
router.delete('/:scheduleId', authenticateToken, ScheduleController.deleteSchedule);

export default router;
