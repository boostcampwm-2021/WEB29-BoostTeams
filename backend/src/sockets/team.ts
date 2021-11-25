import { Socket } from 'socket.io';
import { onlineUsersByTeam, onlineUsersInfo } from './store';

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
		socket.emit('online users', { onlineUsers: onlineUsersByTeam[teamId] });
	};

	const sendOnlineUsersToRoom = (socket: Socket, teamId: number): void => {
		socket.to('users').emit('online users', { onlineUsers: onlineUsersByTeam[teamId] });
	};

	socket.on('enter users room', () => {
		const { teamId } = onlineUsersInfo[socket.id];
		socket.join('users');
		sendOnlineUsers(socket, teamId);
	});

	socket.on('leave users room', () => {
		socket.leave('users');
	});

	socket.on('change status to online', ({ teamId, userId }: { teamId: number; userId: number }) => {
		setUserStatusToOnline(teamId, userId, socket);
		sendOnlineUsersToRoom(socket, teamId);
	});

	socket.on('disconnect', () => {
		if (!onlineUsersInfo[socket.id]) return;
		const { teamId, userId } = onlineUsersInfo[socket.id];
		setUserStatusToOffline(teamId, userId, socket.id);
		sendOnlineUsersToRoom(socket, teamId);
	});
};

export default initTeam;
