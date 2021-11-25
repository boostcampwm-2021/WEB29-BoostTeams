import express from 'express';
import TeamController from '@controllers/team-contorller';
import { authenticateToken } from '@middlewares/token';
import { checkTeamUser, checkIsManager } from '@src/middlewares/user';
const router = express.Router();

router.post('/', authenticateToken, TeamController.create); // 팀 생성, [team, team-user]
router.get('/', authenticateToken, TeamController.read); // 팀, 초대 목록 [team-user]
router.put('/:teamId', authenticateToken, checkIsManager, TeamController.update); // 팀 수정 [team]
router.delete('/:teamId', authenticateToken, checkIsManager, TeamController.delete); // 팀 삭제, [team]

router.get('/:teamId', authenticateToken, checkTeamUser, TeamController.readTeamInfo); // 팀 정보 (이름, 팀 desc ..)
router.get('/:teamId/users', authenticateToken, checkTeamUser, TeamController.readTeamUsers); // 팀의 모든 유저 리스트

router.delete('/:teamId/users/:userId', authenticateToken, checkIsManager, TeamController.kickOut); // 유저 강퇴
router.patch('/:teamId/users/:userId', authenticateToken, checkIsManager, TeamController.changeRole); // 권한 변경

router.post('/:teamId/invitations', authenticateToken, checkIsManager, TeamController.invite); // 초대 전송 [team-user]
router.patch('/:teamId/invitations', authenticateToken, TeamController.acceptInvitation); // 초대 수락 [team-user]
router.delete('/:teamId/invitations', authenticateToken, TeamController.declineInvitation); // 초대 거절 [team-user]

export default router;
