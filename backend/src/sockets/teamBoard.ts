import { Socket } from 'socket.io';
import { onlineUsersInfo } from '@sockets/store';

const initTeamBoard = (socket: Socket) => {
	socket.on('join board page', () => {
		const teamId = Number(onlineUsersInfo[socket.id].teamId);
		socket.join('board');
		socket.emit('join board page', dummyPostit[teamId]);
	});

	socket.on('leave board page', () => socket.leave('board'));

	socket.on('create new postit', (postit) => {
		const teamId = Number(onlineUsersInfo[socket.id].teamId);
		const newPostit = makePostit(postit);
		dummyPostit[teamId].push(newPostit);
		socket.emit('create new postit', dummyPostit[teamId]);
		socket.broadcast.to('board').emit('create new postit', dummyPostit[teamId]);
	});

	socket.on('update postit', (newPostit) => {
		const teamId = Number(onlineUsersInfo[socket.id].teamId);
		const targetPostit = dummyPostit[teamId].find((postit) => postit.id === Number(newPostit.id));
		const updatedPostit = updatePostit(targetPostit, newPostit, 'update');
		dummyPostit[teamId] = dummyPostit[teamId].filter((postit) => postit.id !== Number(newPostit.id));
		dummyPostit[teamId].push(updatedPostit);
		socket.broadcast.to('board').emit('drag postit', updatedPostit);
	});

	socket.on('drag postit', (newPostit) => {
		const teamId = Number(onlineUsersInfo[socket.id].teamId);
		const targetPostit = dummyPostit[teamId].find((postit) => postit.id === Number(newPostit.id));
		const updatedPostit = updatePostit(targetPostit, newPostit, 'drag');
		dummyPostit[teamId] = dummyPostit[teamId].filter((postit) => postit.id !== Number(newPostit.id));
		dummyPostit[teamId].push(updatedPostit);
		socket.broadcast.to('board').emit('drag postit', updatedPostit);
	});

	socket.on('delete postit', (postitId) => {
		const teamId = Number(onlineUsersInfo[socket.id].teamId);
		dummyPostit[teamId] = dummyPostit[teamId].filter((postit) => postit.id !== postitId);
		socket.emit('delete postit', dummyPostit[teamId]);
		socket.broadcast.to('board').emit('delete postit', dummyPostit[teamId]);
	});
};

export default initTeamBoard;

const makePostit = (newData) => {
	return {
		id: dummyPostit.numberOfPostit + 1,
		title: newData.title,
		content: newData.content,
		x: 0,
		y: 0,
		color: newData.color,
		updatedAt: new Date(),
		updatedBy: newData.updatedBy,
		createdAt: new Date(),
		createdBy: newData.createdBy
	};
};

const updatePostit = (targetPostit, newData, updateType) => {
	const updatedPostit = targetPostit;
	Object.keys(newData).forEach((key) => {
		if (['id', 'x', 'y', 'color', 'updatedBy', 'createdBy'].includes(key)) updatedPostit[key] = Number(newData[key]);
	});
	if (updateType === 'update') updatedPostit.updatedAt = new Date();
	return updatedPostit;
};

let dummyPostit = {
	numberOfPostit: 2,
	17: [
		{
			id: 1,
			title: 'title#1',
			content: 'desc#2',
			x: 10,
			y: 10,
			color: 0,
			updatedAt: new Date(),
			updatedBy: 'LeeMir',
			createdAt: new Date(),
			createdBy: 'wonju-dev'
		},
		{
			id: 2,
			title: 'title#2',
			content: 'desc#2',
			x: 50,
			y: 50,
			color: 2,
			updatedAt: new Date(),
			updatedBy: 'LeeMir',
			createdAt: new Date(),
			createdBy: 'wonju-dev'
		}
	],
	18: []
};
