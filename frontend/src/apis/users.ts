import fetchApi from '@utils/fetch';

export const readTeamInfo = async (id: number) => {
	const res = await fetchApi.get(`/api/team/${id}`);
	const data = await res.json();
	return data[0];
};

export const readTeamUsers = async (id: number) => {
	const res = await fetchApi.get(`/api/team/users/${id}`);
	const data = await res.json();
	return data;
};
