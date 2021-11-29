import { Socket } from 'socket.io';
import { onlineUsersInfo } from '@sockets/store';
import { boardEvents } from './eventType';
import Redis from '@redis/index';

const initTeamBoard = (socket: Socket) => {
	const redisClient = new Redis();

	socket.on(boardEvents.ENTER_PAGE, async () => {
		try {
			socket.join('board');
			const teamId = onlineUsersInfo[socket.id].teamId;
			const postitList = await redisClient.read('board', teamId);
			socket.emit(boardEvents.ENTER_PAGE, postitList);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.LOAD);
		}
	});

	socket.on(boardEvents.LEAVE_PAGE, () => socket.leave('board'));

	socket.on(boardEvents.CREATE_POSTIT, async (postit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const newPostit = await makePostitObj(postit);
			await redisClient.create('board', teamId, newPostit);
			socket.emit(boardEvents.CREATE_POSTIT, newPostit);
			socket.broadcast.to('board').emit(boardEvents.CREATE_POSTIT, newPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.CREATE);
		}
	});

	socket.on(boardEvents.UPDATE_START, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await redisClient.update('board', teamId, newPostit);
			socket.broadcast.to('board').emit(boardEvents.UPDATE_START, updatedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.UPDATE);
		}
	});

	socket.on(boardEvents.UPDATE_END, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await redisClient.update('board', teamId, newPostit);
			socket.broadcast.to('board').emit(boardEvents.UPDATE_END, updatedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.UPDATE);
		}
	});

	socket.on(boardEvents.DRAG_START, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await redisClient.update('board', teamId, newPostit);
			socket.broadcast.to('board').emit(boardEvents.DRAG_START, draggedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE);
		}
	});

	socket.on(boardEvents.DRAG_END, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await redisClient.update('board', teamId, newPostit);
			socket.broadcast.to('board').emit(boardEvents.DRAG_END, draggedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE);
		}
	});

	socket.on(boardEvents.DELETE, async (postitId) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostitList = await redisClient.remove('board', teamId, postitId);
			socket.emit(boardEvents.DELETE, updatedPostitList);
			socket.broadcast.to('board').emit(boardEvents.DELETE, updatedPostitList);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.DELETE);
		}
	});
};

export default initTeamBoard;

const makePostitObj = async (newData) => {
	const id = Number(await Redis.getIndex());
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
