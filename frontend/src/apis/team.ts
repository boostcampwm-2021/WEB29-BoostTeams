import fetchApi from '@utils/fetch';
import { toast } from 'react-toastify';

export const readMyTeam = async () => {
	const res = await fetchApi.get(`/api/team`);
	const data = await res.json();
	return data;
};

interface teamData {
	team_id?: number;
	team_name: string;
	team_desc: string;
}

export const create = async (setLoadTrigger: (param: any) => void, teamData: teamData) => {
	await fetchApi.post('/api/team/create', { ...teamData });
	setLoadTrigger((prev: number) => prev + 1);
};

export const update = async (setLoadTrigger: (param: any) => void, teamData: teamData) => {
	await fetchApi.put('/api/team', { ...teamData });
	setLoadTrigger((prev: number) => prev + 1);
};

export const accept = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.post('/api/team/invite/response', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const decline = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.delete('/api/team/invite/response', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const kickOut = async (setLoadTrigger: (param: any) => void, user_id: number, team_id: number) => {
	await fetchApi.delete(`/api/team/${user_id}`, { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const leaveTeam = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.delete('/api/team/invite/response', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const deleteTeam = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.delete('/api/team', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const inviteUser = async (team_id: number, user_name: string) => {
	try {
		const res = await fetchApi.post('/api/team/invite', { team_id, user_name });
		if (res.status === 204) throw new Error();
	} catch (err) {
		toast.error('😣 해당 유저가 존재하지 않습니다!');
	}
};

export const readTeamInfo = async (id: number) => {
	const res = await fetchApi.get(`/api/team/${id}`);
	const data = await res.json();
	return data;
};

export const readTeamUsers = async (id: number) => {
	const res = await fetchApi.get(`/api/team/users/${id}`);
	const data = await res.json();
	return data;
};
