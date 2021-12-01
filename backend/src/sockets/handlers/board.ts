import { onlineUsersInfo } from '@sockets/store';
import { Socket } from 'socket.io';
import BoardService from '@services/board-service';
import { boardEvents } from '../eventType';
import { IPostit } from '@src/customeTypes/board';

const BOARD = 'board';

const boardHandler = {
	enterPage: async (socket: Socket) => {
		try {
			socket.join(BOARD);
			const teamId = onlineUsersInfo[socket.id].teamId;
			const postitList = await BoardService.getPostitList(teamId);
			socket.emit(boardEvents.ENTER_PAGE, postitList);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.LOAD);
		}
	},
	leavePage: (socket: Socket) => socket.leave(BOARD),
	create: async (socket: Socket, postit: IPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const newPostit = await BoardService.createPostit(postit, teamId);
			socket.emit(boardEvents.CREATE_POSTIT, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.CREATE_POSTIT, newPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.CREATE);
		}
	},
	delete: async (socket: Socket, postitId: number) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostitList = await BoardService.deletePostit(teamId, postitId);
			socket.emit(boardEvents.DELETE, updatedPostitList);
			socket.broadcast.to(BOARD).emit(boardEvents.DELETE, updatedPostitList);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.DELETE);
		}
	},
	dragStart: async (socket: Socket, newPostit: IPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await BoardService.updatePostit(teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.DRAG_START, draggedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE);
		}
	},
	dragEnd: async (socket: Socket, newPostit: IPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const draggedPostit = await BoardService.updatePostit(teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.DRAG_END, draggedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE);
		}
	},
	updateStart: async (socket: Socket, newPostit: IPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await BoardService.updatePostit(teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.UPDATE_START, updatedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.UPDATE);
		}
	},
	updateEnd: async (socket: Socket, newPostit: IPostit) => {
		try {
			const teamId = onlineUsersInfo[socket.id].teamId;
			const updatedPostit = await BoardService.updatePostit(teamId, newPostit);
			socket.broadcast.to(BOARD).emit(boardEvents.UPDATE_END, updatedPostit);
		} catch (err) {
			socket.emit(boardEvents.ERROR.TYPE, boardEvents.ERROR.MESSAGES.UPDATE);
		}
	}
};

export default boardHandler;
