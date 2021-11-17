import express from 'express';
import TeamController from '@controllers/team-contorller';
import { authenticateToken } from '@middlewares/token';

const router = express.Router();

router.get('/team/:id', authenticateToken, TeamController.readTeamInfo);
router.get('/:id', authenticateToken, TeamController.readTeamUsers);

export default router;
