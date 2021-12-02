import { Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import { Role } from '@utils/constants';
import fetchApi from '@utils/fetch';
import { teamEvents } from '@src/types/eventType';
import { TeamUsersResType, TeamUsersType, UserIdType } from '@src/types/team';

interface teamData {
	team_id?: number;
	team_name: string;
	team_desc: string;
}

export const create = async (setLoadTrigger: (param: any) => void, teamData: teamData) => {
	try {
		const res = await fetchApi.post('/api/teams', { ...teamData });
		if (res.status === 409) throw new Error('😣 팀 생성에 실패했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const readMyTeam = async () => {
	try {
		const res = await fetchApi.get(`/api/teams`);
		if (res.status === 409) throw new Error('😣 팀 목록을 읽어오지 못했습니다!');
		const data = await res.json();
		return data;
	} catch (err) {
		toast.error((err as Error).message);
		return err;
	}
};

export const update = async (setLoadTrigger: (param: any) => void, teamId: number, teamData: teamData) => {
	try {
		const res = await fetchApi.put(`/api/teams/${teamId}`, { ...teamData });
		if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 팀 업데이트에 실패했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const deleteTeam = async (setLoadTrigger: (param: any) => void, teamId: number) => {
	try {
		const res = await fetchApi.delete(`/api/teams/${teamId}`);
		if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 팀 삭제에 실패했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const inviteUser = async (teamId: number, userName: string) => {
	try {
		const res = await fetchApi.post(`/api/teams/${teamId}/invitations`, { teamId, userName });
		if (res.status === 404) throw new Error('😣 해당 유저가 존재하지 않습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 초대에 실패했습니다!');
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const accept = async (setLoadTrigger: (param: any) => void, teamId: number) => {
	try {
		const res = await fetchApi.patch(`/api/teams/${teamId}/invitations`, {});
		if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 초대를 수락하지 못했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const decline = async (setLoadTrigger: (param: any) => void, teamId: number) => {
	try {
		const res = await fetchApi.delete(`/api/teams/${teamId}/invitations`);
		if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 초대를 거절하지 못했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const kickOut = async (setLoadTrigger: (param: any) => void, userId: number, teamId: number) => {
	try {
		const res = await fetchApi.delete(`/api/teams/${teamId}/users/${userId}`);
		if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 유저 강퇴에 실패했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const leaveTeam = async (setLoadTrigger: (param: any) => void, teamId: number) => {
	try {
		const res = await fetchApi.delete(`/api/teams/${teamId}/invitations`);
		if (res.status === 409) throw new Error('😣 팀 탈퇴에 실패했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const readTeamInfo = async (id: number) => {
	try {
		const res = await fetchApi.get(`/api/teams/${id}`);
		if (res.status === 403) throw new Error('😣 올바른 접근이 아닙니다!');
		else if (res.status === 403) throw new Error('😣 팀 정보를 읽어오지 못했습니다!');
		const data = await res.json();
		return data;
	} catch (err) {
		toast.error((err as Error).message);
		return err;
	}
};

export const readTeamUsers = async (id: number) => {
	try {
		const res = await fetchApi.get(`/api/teams/${id}/users`);
		if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 유저 목록을 읽어오지 못했습니다!');
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
	} catch (err) {
		toast.error((err as Error).message);
		return {};
	}
};

export const patchRole = async (
	setLoadTrigger: (param: any) => void,
	userId: number,
	teamId: number,
	newRole: number,
) => {
	try {
		const res = await fetchApi.patch(`/api/teams/${teamId}/users/${userId}`, { role: newRole });
		if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		else if (res.status === 409) throw new Error('😣 권한 수정에 실패했습니다!');
		setLoadTrigger((prev: number) => prev + 1);
	} catch (err) {
		toast.error((err as Error).message);
	}
};

export const socketApi = {
	enterChatPage: (socket: Socket): void => {
		socket.emit(teamEvents.ENTER_USERS_PAGE);
	},
	leaveChatPage: (socket: Socket): void => {
		socket.emit(teamEvents.LEAVE_USERS_PAGE);
	},
	receiveOnlineUsers: (socket: Socket, handler: (onlineUsers: UserIdType[]) => void): void => {
		socket.on(teamEvents.ONLINE_USERS, ({ onlineUsers }) => handler(onlineUsers));
	},
	offReceiveOnlineUsers: (socket: Socket): void => {
		socket.off(teamEvents.ONLINE_USERS);
	},
};
