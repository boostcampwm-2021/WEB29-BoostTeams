import { atom, selector, selectorFamily } from 'recoil';
import { readMyTeam } from '@apis/team';
import { readTeamUsers } from '@apis/users';
import { TeamUsersResType, TeamUsersType } from '@src/types/team';
import { Role } from '@utils/constants';

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
