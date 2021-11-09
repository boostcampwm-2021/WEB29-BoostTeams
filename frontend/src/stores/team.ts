import { atom, selector } from 'recoil';
import { readMyTeam } from '../apis/team';

export const userInviteList = atom({
	key: 'inviteList',
	default: [
		{ team_id: 3, team_name: 'team#4', team_desc: 'team_desc#4' },
		{ team_id: 4, team_name: 'team#5', team_desc: 'team_desc#5' },
	],
});

export const userTeamList = selector({
	key: 'teamList',
	get: async ({ get }) => {
		// 기존 : recoil에 저장된 user 정보를 기반으로 요청
		// 변경 : JWT 값으로 요청, user 구분은 서버에서 담당
		const response = await readMyTeam();
		const json = await response.json();
		console.log(json);
		return json;
	},
});
