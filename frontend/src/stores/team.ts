import { atom, selector, selectorFamily } from 'recoil';
import { readMyTeam, readTeamInfo, readTeamUsers } from '@apis/team';

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

export const teamInfoLoadTrigger = atom({
	key: 'loadTrigger',
	default: 0,
});

export const teamInfoSelector = selectorFamily({
	key: 'teamInfoSelector',
	get:
		(teamId: number) =>
		async ({ get }) => {
			get(teamInfoLoadTrigger);
			const team = await readTeamInfo(teamId);
			return team;
		},
});

export const selectedUser = atom({
	key: 'user',
	default: {
		id: -1,
	},
});

export const teamUsersTrigger = atom({
	key: 'teamUsersTrigger',
	default: 0,
});

export const teamUsersSelector = selectorFamily({
	key: 'teamUsersSelector',
	get:
		(teamId: number) =>
		async ({ get }) => {
			get(teamUsersTrigger);
			const data = await readTeamUsers(teamId);
			return data;
		},
});

export const modalState = atom({
	key: 'modalState',
	default: {
		isOpen: false,
		mode: '',
	},
});
