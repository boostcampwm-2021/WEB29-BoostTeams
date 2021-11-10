import { MutableRefObject } from 'react';
import fetchApi from '../utils/fetch';
import { CardData } from '../components/Team/CardList';

export const readMyTeam = async () => {
	const response = await fetchApi.get(`/api/team`);
	const json = await response.json();
	return json;
};

export const joinNewTeam = async (setLoadTrigger: (param: any) => void, cardData: MutableRefObject<CardData>) => {
	// add 따로
	const response = await fetchApi.post('/api/team/join', {
		team_id: cardData.current.team.team_id,
		team_name: cardData.current.team.team_name,
		team_desc: cardData.current.team.team_desc,
	});
	// refresh 따로
	setLoadTrigger((prev: number) => prev + 1);
};
