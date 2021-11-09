import { atom, selector } from 'recoil';
import { readMyTeam } from '../apis/team';

export const userInviteList = atom({
	key: 'inviteList',
	default: [
		{
			team_user_id: 1,
			team: {
				team_id: 3,
				team_name: 'team#4',
				team_desc: 'team_desc#4',
			},
		},
		{
			team_user_id: 2,
			team: {
				team_id: 4,
				team_name: 'team#5',
				team_desc: 'team_desc#5',
			},
		},
	],
});

export const userTeamList = selector({
	key: 'teamList',
	get: async () => {
		const teamList = await readMyTeam();
		return teamList;
	},
});
