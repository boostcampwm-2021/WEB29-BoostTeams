import { Namespace, Socket } from 'socket.io';
import { onlineUsersByTeam, onlineUsersInfo } from './store';

interface UserType {
	userId: string;
}

const teamInit = (namespace: Namespace): void => {
	const setUserStatusToOnline = (teamId: number, userId: string, socketId: string): void => {
		if (!onlineUsersByTeam[teamId]) onlineUsersByTeam[teamId] = [{ userId }];
		else {
			const users = onlineUsersByTeam[teamId].filter((user: UserType) => user.userId !== userId);
			onlineUsersByTeam[teamId] = [...users, { userId }];
		}
		onlineUsersInfo[socketId] = { teamId, userId };
	};

	const setUserStatusToOffline = (teamId: number, userId: string, socketId: string): void => {
		onlineUsersByTeam[teamId] = onlineUsersByTeam[teamId].filter((user: UserType) => user.userId !== userId);
		delete onlineUsersInfo[socketId];
	};

	const sendOnlineUsers = (socket: Socket, teamId: number): void => {
		socket.emit('online users', { onlineUsers: onlineUsersByTeam[teamId] });
	};

	const sendOnlineUsersToRoom = (socket: Socket, teamId: number): void => {
		socket.to('users').emit('online users', { onlineUsers: onlineUsersByTeam[teamId] });
	};

	namespace.on('connect', (socket: Socket) => {
		console.log('socket connect', socket.id, socket.nsp.name);

		socket.on('change status to online', ({ teamId, userId }: { teamId: number; userId: string }) => {
			setUserStatusToOnline(teamId, userId, socket.id);
			sendOnlineUsersToRoom(socket, teamId);
			// console.log('online', onlineUsersByTeam, onlineUsersInfo);
		});

		socket.on('enter users room', () => {
			const { teamId } = onlineUsersInfo[socket.id];
			socket.join('users');
			sendOnlineUsers(socket, teamId);
			console.log('join users');
		});

		socket.on('leave users room', () => {
			socket.leave('users');
		});

		socket.on('disconnect', () => {
			const { teamId, userId } = onlineUsersInfo[socket.id];
			setUserStatusToOffline(teamId, userId, socket.id);
			sendOnlineUsersToRoom(socket, teamId);
			// console.log('offline', onlineUsersByTeam, onlineUsersInfo);
		});
	});
};

export default teamInit;
