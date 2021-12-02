import { Socket } from 'socket.io';
import { teamEvents } from '../eventType';
import { onlineUsersByTeam, onlineUsersInfo } from '../store';
import { UserType } from '@customeTypes/team';

const teamHandler = {
	enterUsersPage: (socket: Socket) => {
		const { teamId } = onlineUsersInfo[socket.id];
		socket.join('users');
		sendOnlineUsers(socket, teamId);
	},
	leaveUsersPage: (socket: Socket) => {
		socket.leave('users');
	},
	changeStatusToOnline: (socket: Socket, { teamId, userId }: { teamId: number; userId: number }) => {
		setUserStatusToOnline(teamId, userId, socket);
		sendOnlineUsersToRoom(socket, teamId);
	},
	disconnect: (socket: Socket) => {
		if (!onlineUsersInfo[socket.id]) return;
		const { teamId, userId } = onlineUsersInfo[socket.id];
		setUserStatusToOffline(teamId, userId, socket.id);
		sendOnlineUsersToRoom(socket, teamId);
	}
};

const setUserStatusToOnline = (teamId: number, userId: number, socket: Socket): void => {
	if (!onlineUsersByTeam[teamId]) onlineUsersByTeam[teamId] = [{ userId }];
	else {
		const users = onlineUsersByTeam[teamId].filter((user: UserType) => user.userId !== userId);
		onlineUsersByTeam[teamId] = [...users, { userId }];
	}
	onlineUsersInfo[socket.id] = { teamId: Number(teamId), userId, socket };
};
const setUserStatusToOffline = (teamId: number, userId: number, socketId: string): void => {
	onlineUsersByTeam[teamId] = onlineUsersByTeam[teamId].filter((user: UserType) => user.userId !== userId);
	delete onlineUsersInfo[socketId];
};
const sendOnlineUsers = (socket: Socket, teamId: number): void => {
	socket.emit(teamEvents.ONLINE_USERS, { onlineUsers: onlineUsersByTeam[teamId] });
};
const sendOnlineUsersToRoom = (socket: Socket, teamId: number): void => {
	socket.to('users').emit(teamEvents.ONLINE_USERS, { onlineUsers: onlineUsersByTeam[teamId] });
};

export default teamHandler;
