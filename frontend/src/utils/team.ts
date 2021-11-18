import { deleteTeam } from '@src/apis/team';

export const handleDeleteBtn = async (setLoadTrigger: any, teamId: number) => {
	await deleteTeam(setLoadTrigger, teamId);
};
