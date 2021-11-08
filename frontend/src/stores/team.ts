import { atom, selector } from 'recoil';
import { readMyTeam } from '../apis/team';
import UserState from './user';

export const userInviteList = atom({
	key: 'inviteList',
	default: [],
});

export const userTeamList = selector({
	key: 'teamList',
	get: async ({ get }) => {
		const user = get(UserState);
		// 일단은 email로 찾는데, user_id가 있으면 좋을 듯?
		const userEmail = user.email;
		const response = await readMyTeam(userEmail);
		const json = await response.json();
		return json;
	},
});
