import { Socket } from 'socket.io';
import { onlineUsersByTeam, onlineUsersInfo } from '../store';
import { teamEvents } from '../eventType';

interface UserType {
	userId: number;
}

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

const initTeam = (socket: Socket): void => {
	const sendOnlineUsers = (socket: Socket, teamId: number): void => {
		socket.emit(teamEvents.ONLINE_USER, { onlineUsers: onlineUsersByTeam[teamId] });
	};

	const sendOnlineUsersToRoom = (socket: Socket, teamId: number): void => {
		socket.to('users').emit(teamEvents.ONLINE_USER, { onlineUsers: onlineUsersByTeam[teamId] });
	};

	socket.on(teamEvents.ENTER_USERS_ROOM, () => {
		const { teamId } = onlineUsersInfo[socket.id];
		socket.join('users');
		sendOnlineUsers(socket, teamId);
	});

	socket.on(teamEvents.LEAVE_USERS_ROOM, () => {
		socket.leave('users');
	});

	socket.on(teamEvents.CHANGE_STATUS_TO_ONLINE, ({ teamId, userId }: { teamId: number; userId: number }) => {
		setUserStatusToOnline(teamId, userId, socket);
		sendOnlineUsersToRoom(socket, teamId);
	});

	socket.on(teamEvents.DISCONNECT, () => {
		if (!onlineUsersInfo[socket.id]) return;
		const { teamId, userId } = onlineUsersInfo[socket.id];
		setUserStatusToOffline(teamId, userId, socket.id);
		sendOnlineUsersToRoom(socket, teamId);
	});
};

export default initTeam;
