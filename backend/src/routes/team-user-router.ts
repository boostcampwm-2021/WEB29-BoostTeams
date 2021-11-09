import express from 'express';
import TeamUserController from '../controllers/team-user-contorller';
import { authenticateToken } from '../middlewares/token';
const router = express.Router();

router.post('/:user_id/teams', TeamUserController.createTeam);
router.post('/join', authenticateToken, TeamUserController.joinTeam);
router.get('/', authenticateToken, TeamUserController.getTeam);
router.put('/:user_id/teams/:team_id', TeamUserController.updateTeam);
router.delete('/:user_id/teams/:team_id', TeamUserController.deleteTeam);

export default router;
