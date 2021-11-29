import { Socket } from 'socket.io';
import { onlineUsersInfo } from '@sockets/store';
import { boardEvents } from '../eventType';
import Redis from '@redis/index';

/* 
event = {
	EnterPage : () =>{
		RedisController.getPostit();
	},
	LeavePage : () =>{},
	...
}

	handler
		- teamboard
		- chat
		- team

	teamboard
	socket.on(boardEvents.CREATE_POSTIT, (postit) => teamboardHandler.createPostit())
 */

const initTeamBoard = (socket: Socket) => {
	const redisClient = new Redis();

	socket.on(boardEvents.ENTER_PAGE, async () => {
		try {
			socket.join(BOARD);
			const teamId = onlineUsersInfo[socket.id].teamId;
			const postitList = await redisClient.get(BOARD, teamId);
			socket.emit(boardEvents.ENTER_PAGE, postitList);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.LOAD);
		}
	});

	socket.on(boardEvents.LEAVE_PAGE, () => socket.leave(BOARD));

	socket.on(boardEvents.CREATE_POSTIT, async (postit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const newPostit = await makePostitObj(postit);
			await redisClient.set(BOARD, teamId, newPostit);
			socket.emit(boardEvents.CREATE_POSTIT, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.CREATE_POSTIT, newPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.CREATE);
		}
	});

	socket.on(boardEvents.UPDATE_START, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await redisClient.set(BOARD, teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.UPDATE_START, updatedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.UPDATE);
		}
	});

	socket.on(boardEvents.UPDATE_END, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await redisClient.set(BOARD, teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.UPDATE_END, updatedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.UPDATE);
		}
	});

	socket.on(boardEvents.DRAG_START, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await redisClient.set(BOARD, teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.DRAG_START, draggedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE);
		}
	});

	socket.on(boardEvents.DRAG_END, async (newPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await redisClient.set(BOARD, teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.DRAG_END, draggedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE);
		}
	});

	socket.on(boardEvents.DELETE, async (postitId) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostitList = await redisClient.delete(BOARD, teamId, postitId);
			socket.emit(boardEvents.DELETE, updatedPostitList);
			socket.broadcast.to(BOARD).emit(boardEvents.DELETE, updatedPostitList);
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

const BOARD = 'board';
