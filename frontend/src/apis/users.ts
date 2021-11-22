import { TeamUsersResType, TeamUsersType } from '@src/types/team';
import { Role } from '@utils/constants';
import fetchApi from '@utils/fetch';

export const readTeamInfo = async (id: number) => {
	const res = await fetchApi.get(`/api/team/${id}`);
	const data = await res.json();
	return data[0];
};

export const readTeamUsers = async (id: number) => {
	const res = await fetchApi.get(`/api/team/users/${id}`);
	const data = await res.json();
	const entries = data.map((el: TeamUsersResType) => {
		return [
			el.user.user_id,
			{
				userId: el.user.user_id,
				name: el.user.user_name,
				email: el.user.user_email,
				color: el.user.user_color,
				role: Role[el.role],
			},
		];
	});
	const teamUsers: TeamUsersType = Object.fromEntries(entries);
	return teamUsers;
};
