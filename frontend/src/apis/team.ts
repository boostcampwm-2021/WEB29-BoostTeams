import fetchApi from '../utils/fetch';

export const readMyTeam = async () => {
	const response = await fetchApi.get(`/api/team`);
	const json = await response.json();
	return json;
};
