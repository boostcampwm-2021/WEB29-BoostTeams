import express from 'express';
import TeamUserController from '../controllers/team-user-contorller';
const router = express.Router();

router.post('/:user_id/teams', TeamUserController.getTeams);
router.get('/:user_id/teams', TeamUserController.getTeams);
router.put('/:user_id/team/:team_id', () => {});
router.delete('/:user_id/team/:team_id', () => {});

export default router;
