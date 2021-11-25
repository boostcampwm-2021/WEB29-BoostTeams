import { Socket } from 'socket.io';
import { onlineUsersInfo } from '@sockets/store';
import Redis from '@redis/index';

const initTeamBoard = (socket: Socket) => {
	const redisClient = new Redis();

	socket.on('join board page', async () => {
		try {
			socket.join('board');
			const teamId = onlineUsersInfo[socket.id].teamId;
			const postitList = await redisClient.get('board', teamId);
			socket.emit('join board page', postitList);
		} catch (err) {
			socket.emit('team board error', '포스트잇을 불러오는데 실패했습니다!');
		}
	});

	socket.on('leave board page', () => socket.leave('board'));

	socket.on('create new postit', async (postit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const newPostit = await makePostitObj(postit);
			await redisClient.set('board', teamId, newPostit);
			socket.emit('create new postit', newPostit);
			socket.broadcast.to('board').emit('create new postit', newPostit);
		} catch (err) {
			socket.emit('team board error', '새로운 포스트잇 생성 실패!');
		}
	});

	socket.on('update start postit', async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await redisClient.set('board', teamId, newPostit);
			socket.broadcast.to('board').emit('update start postit', updatedPostit);
		} catch (err) {
			socket.emit('team board error', '포스트잇을 업데이트 할 수 없습니다!');
		}
	});

	socket.on('update end postit', async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await redisClient.set('board', teamId, newPostit);
			socket.broadcast.to('board').emit('update end postit', updatedPostit);
		} catch (err) {
			socket.emit('team board error', '포스트잇 업데이트 실패!');
		}
	});

	socket.on('drag postit', async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await redisClient.set('board', teamId, newPostit);
			socket.broadcast.to('board').emit('drag postit', draggedPostit);
		} catch (err) {
			socket.emit('team board error');
		}
	});

	socket.on('drag end postit', async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await redisClient.set('board', teamId, newPostit);
			socket.broadcast.to('board').emit('drag end postit', draggedPostit);
		} catch (err) {
			socket.emit('team board error');
		}
	});

	socket.on('delete postit', async (postitId) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostitList = await redisClient.delete('board', teamId, postitId);
			socket.emit('delete postit', updatedPostitList);
			socket.broadcast.to('board').emit('delete postit', updatedPostitList);
		} catch (err) {
			socket.emit('team board error', '포스트잇 삭제 실패!');
		}
	});
};

export default initTeamBoard;

const makePostitObj = async (newData) => {
	const id = await Redis.getNextId('board');
	return {
		id: id,
		title: newData.title,
		content: newData.content,
		x: 0,
		y: 0,
		color: newData.color,
		updatedAt: new Date(),
		updatedBy: newData.updatedBy,
		createdAt: new Date(),
		createdBy: newData.createdBy,
		whoIsDragging: -1,
		whoIsUpdating: -1
	};
};
