import fetchApi from '@utils/fetch';

export const readMyTeam = async () => {
	const res = await fetchApi.get(`/api/team`);
	const data = await res.json();
	return data;
};

interface teamData {
	team_name: string;
	team_desc: string;
}

export const create = async (setLoadTrigger: (param: any) => void, teamData: teamData) => {
	await fetchApi.post('/api/team/create', { ...teamData });
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

export const leaveTeam = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.delete('/api/team/invite/response', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};

export const deleteTeam = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	await fetchApi.delete('/api/team', { team_id });
	setLoadTrigger((prev: number) => prev + 1);
};
