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

	const setUserStatusToOffline = (socketId: string): void => {
		const { teamId, userId } = onlineUsersInfo[socketId];
		onlineUsersByTeam[teamId] = onlineUsersByTeam[teamId].filter((user: UserType) => user.userId !== userId);
		delete onlineUsersInfo[socketId];
	};

	namespace.on('connect', (socket: Socket) => {
		console.log('socket connect', socket.id, socket.nsp.name);

		socket.on('change status to online', ({ teamId, userId }: { teamId: number; userId: string }) => {
			setUserStatusToOnline(teamId, userId, socket.id);
			console.log('online', onlineUsersByTeam, onlineUsersInfo);
		});

		socket.on('disconnect', () => {
			setUserStatusToOffline(socket.id);
			console.log('offline', onlineUsersByTeam, onlineUsersInfo);
		});
	});
};

export default teamInit;
