import { atom, selector } from 'recoil';
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
		const response = await fetch(`http://localhost:4000/api/team/${user.email}`);
		const json = await response.json();
		return json;
	},
});
