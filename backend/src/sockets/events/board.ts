import { Socket } from 'socket.io';
import { boardEvents } from '../eventType';
import boardHandler from '../handlers/board';

const initBoard = (socket: Socket) => {
	socket.on(boardEvents.LEAVE_PAGE, () => boardHandler.leavePage(socket));
	socket.on(boardEvents.ENTER_PAGE, () => boardHandler.enterPage(socket));
	socket.on(boardEvents.CREATE_POSTIT, (postit) => boardHandler.create(socket, postit));
	socket.on(boardEvents.UPDATE_START, (newPostit) => boardHandler.updateStart(socket, newPostit));
	socket.on(boardEvents.UPDATE_END, (newPostit) => boardHandler.updateEnd(socket, newPostit));
	socket.on(boardEvents.DRAG_START, (newPostit) => boardHandler.dragStart(socket, newPostit));
	socket.on(boardEvents.DRAG_END, (newPostit) => boardHandler.dragEnd(socket, newPostit));
	socket.on(boardEvents.DELETE, (postitId) => boardHandler.delete(socket, postitId));
};

export default initBoard;
