import { deleteTeam } from '@apis/team';

export const handleDeleteBtn = async (setLoadTrigger: any, teamId: number) => {
	await deleteTeam(setLoadTrigger, teamId);
};
