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
			// 새로운 post 생성 & 저장
			const newPostit = makeNewPostit(title, desc, teamId);
			dummyPostit.push(newPostit);
			// 전체 post를 생성자한테 전송
			socket.emit('create new postit', dummyPostit);
			// 전체 post를 room에 broadcast 전송
			socket.broadcast.to('board').emit('create new postit', dummyPostit);
		});

		socket.on('update postit', ({ id, title, content }) => {
			const updatedPostit = dummyPostit.find((postit) => postit.id === Number(id));
			updatedPostit.title = title;
			updatedPostit.content = content;
			dummyPostit = dummyPostit.filter((postit) => postit.id !== Number(id));
			dummyPostit.push(updatedPostit);
			socket.broadcast.to('board').emit('drag postit', updatedPostit);
		});

		socket.on('drag postit', ({ id, x, y }) => {
			const movedPostit = dummyPostit.find((postit) => postit.id === Number(id));
			movedPostit.x = x;
			movedPostit.y = y;
			dummyPostit = dummyPostit.filter((postit) => postit.id !== Number(id));
			dummyPostit.push(movedPostit);
			socket.broadcast.to('board').emit('drag postit', movedPostit);
		});

		socket.on('disconnect', () => {
			const { teamId, userId } = onlineUsersInfo[socket.id];
			setUserStatusToOffline(teamId, userId, socket.id);
			sendOnlineUsersToRoom(socket, teamId);
		});
	});
};

export default teamInit;

const makeNewPostit = (title, desc, teamId) => {
	return {
		id: dummyPostit.length + 1,
		title: title,
		content: desc,
		x: 0,
		y: 0,
		color: Math.floor(Math.random() * 6),
		updatedAt: new Date(),
		updatedBy: 'user#?',
		createdAt: new Date(),
		createdBy: 'user#?'
	};
};

let dummyPostit = [
	{
		id: 1,
		title: 'title#1',
		content: 'desc#2',
		x: 10,
		y: 10,
		color: 0,
		updatedAt: new Date(2021, 11, 16),
		updatedBy: 'LeeMir',
		createdAt: new Date(2021, 11, 15),
		createdBy: 'wonju-dev'
	},
	{
		id: 2,
		title: 'title#2',
		content: 'desc#2',
		x: 50,
		y: 50,
		color: 2,
		updatedAt: new Date(2021, 11, 16),
		updatedBy: 'LeeMir',
		createdAt: new Date(2021, 11, 15),
		createdBy: 'wonju-dev'
	}
];
