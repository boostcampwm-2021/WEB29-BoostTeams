import fetchApi from '../utils/fetch';

export const readMyTeam = async () => {
	const res = await fetchApi.get(`/api/team`);
	const data = await res.json();
	return data;
};

export const joinNewTeam = async (setLoadTrigger: (param: any) => void, team_id: number) => {
	// add 따로
	const res = await fetchApi.post('/api/team/invite/response', { team_id });
	// refresh 따로
	setLoadTrigger((prev: number) => prev + 1);
};
