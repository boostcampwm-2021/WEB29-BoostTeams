import fetchApi from '../utils/fetch';

export const readMyTeam = async (userEmail: string) => {
	const response = await fetchApi.get(`/api/team/${userEmail}`);
	const json = await response.json();
	return json;
};
