import { TeamUsersResType, TeamUsersType } from '@src/types/team';
import { Role } from '@utils/constants';
import fetchApi from '@utils/fetch';
import { toast } from 'react-toastify';

interface teamData {
	team_id?: number;
	team_name: string;
	team_desc: string;
}

export const create = async (setLoadTrigger: (param: any) => void, teamData: teamData) => {
	await fetchApi.post('/api/teams', { ...teamData });
	setLoadTrigger((prev: number) => prev + 1);
};

export const readMyTeam = async () => {
	const res = await fetchApi.get(`/api/teams`);
	const data = await res.json();
	return data;
};

export const update = async (setLoadTrigger: (param: any) => void, teamId: number, teamData: teamData) => {
	console.log(JSON.stringify(teamData));
	await fetchApi.put(`/api/teams/${teamId}`, { ...teamData });
	setLoadTrigger((prev: number) => prev + 1);
};

export const deleteTeam = async (setLoadTrigger: (param: any) => void, teamId: number) => {
	await fetchApi.delete(`/api/teams/${teamId}`);
	setLoadTrigger((prev: number) => prev + 1);
};

export const inviteUser = async (teamId: number, userName: string) => {
	try {
		const res = await fetchApi.post(`/api/teams/${teamId}/invitations`, { teamId, userName });
		if (res.status !== 201) throw new Error();
	} catch (err) {
		toast.error('😣 해당 유저가 존재하지 않습니다!');
	}
};

export const accept = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.post('/api/teams/invite/response', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const decline = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.delete('/api/teams/invite/response', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const kickOut = async (setLoadTrigger: (param: any) => void, userId: number, teamId: number) => {
	await fetchApi.delete(`/api/teams/${teamId}/users/${userId}`);
	setLoadTrigger((prev: number) => prev + 1);
};

export const leaveTeam = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.delete('/api/teams/invite/response', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const readTeamInfo = async (id: number) => {
	const res = await fetchApi.get(`/api/teams/${id}`);
	const data = await res.json();
	return data;
};

export const readTeamUsers = async (id: number) => {
	const res = await fetchApi.get(`/api/teams/${id}/users`);
	const data = await res.json();
	const entries = data.map((el: TeamUsersResType) => {
		return [
			el.user.user_id,
			{
				userId: el.user.user_id,
				name: el.user.user_name,
				email: el.user.user_email,
				color: el.user.user_color,
				role: Role[el.role],
			},
		];
	});
	const teamUsers: TeamUsersType = Object.fromEntries(entries);
	return teamUsers;
};

export const patchRole = async (
	setLoadTrigger: (param: any) => void,
	userId: number,
	teamId: number,
	newRole: number,
) => {
	const res = await fetchApi.patch(`/api/teams/${teamId}/users/${userId}`, { role: newRole });
	if (res.status === 404) throw new Error();
	setLoadTrigger((prev: number) => prev + 1);
};
