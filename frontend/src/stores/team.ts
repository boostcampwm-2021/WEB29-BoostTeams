import { atom, selector } from 'recoil';
import { readMyTeam } from '../apis/team';

export const teamListLoadTrigger = atom({
	key: 'loadTrigger',
	default: 0,
});

export const userTeamList = selector({
	key: 'teamList',
	get: async ({ get }) => {
		get(teamListLoadTrigger);
		const teamList = await readMyTeam();
		return teamList;
	},
});
