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

		socket.on('join board page', () => {
			console.log('join board page');
			socket.join('board');
			socket.emit('join board page', dummyPostit);
		});

		socket.on('leave board page', () => {
			console.log('leave board page');
			socket.leave('board');
		});

		socket.on('create new postit', ({ title, desc, teamId }) => {
			console.log(title, desc, teamId);
			// 새로운 post 생성 & 저장
			const newPostit = makeNewPostit(title, desc, teamId);
			dummyPostit.push(newPostit);
			// 전체 post를 생성자한테 전송
			socket.emit('create new postit', dummyPostit);
			// 전체 post를 room에 broadcast 전송
			socket.broadcast.to('board').emit('create new postit', dummyPostit);
		});

		socket.on('drag postit', ({ id, x, y }) => {
			const updatedPostit = dummyPostit.filter((postit) => {
				if (postit.key !== id) return postit;
				else {
					const temp = postit;
					temp.x = x;
					temp.y = y;
					return temp;
				}
			});
			socket.broadcast.to('board').emit('drag postit', updatedPostit);
		});

		socket.on('disconnect', () => {
			const { teamId, userId } = onlineUsersInfo[socket.id];
			setUserStatusToOffline(teamId, userId, socket.id);
			sendOnlineUsersToRoom(socket, teamId);
		});
	});
};

export default teamInit;
/* 
{
	team#1 : [{post#1}, {post#2}],
	team#2 : [{post#1}, {post#2}, {post#3}]
}
*/

const makeNewPostit = (title, desc, teamId) => {
	return {
		key: dummyPostit.length + 1,
		title: title,
		content: desc,
		x: 0,
		y: 0,
		color: 'red',
		updatedDate: JSON.stringify(new Date())
	};
};

const dummyPostit = [
	{
		key: 1,
		title: 'title#1',
		content:
			'desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1',
		x: 10,
		y: 10,
		color: 'red',
		updatedDate: '2021.07.02.'
	}
];
