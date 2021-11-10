import express from 'express';
import TeamUserController from '../controllers/team-user-contorller';
import { authenticateToken } from '../middlewares/token';
const router = express.Router();

router.post('/new', authenticateToken, TeamUserController.createTeam);
router.post('/join', authenticateToken, TeamUserController.joinTeam);
router.get('/', authenticateToken, TeamUserController.getTeam);
router.put('/:team_id', authenticateToken, TeamUserController.updateTeam);
router.delete('/:team_id', TeamUserController.deleteTeam);

export default router;
