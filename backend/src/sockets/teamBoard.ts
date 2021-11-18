import { Socket } from 'socket.io';

const initTeamBoard = (socket: Socket) => {
	socket.on('join board page', () => {
		console.log('join board page');
		socket.join('board');
		socket.emit('join board page', dummyPostit);
	});

	socket.on('leave board page', () => {
		console.log('leave board page');
		socket.leave('board');
	});

	socket.on('create new postit', ({ title, content, teamId }) => {
		// 새로운 post 생성 & 저장
		const newPostit = makeNewPostit(title, content, teamId);
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

	socket.on('delete postit', ({ id }) => {
		dummyPostit = dummyPostit.filter((postit) => postit.id !== id);
		socket.emit('delete postit', dummyPostit);
		socket.broadcast.to('board').emit('delete postit', dummyPostit);
	});
};

export default initTeamBoard;

const makeNewPostit = (title, content, teamId) => {
	return {
		id: dummyPostit.length + 1,
		title: title,
		content: content,
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
];
