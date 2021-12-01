import { ICreatePostit, IUpdatePostit } from '@src/types/board';
import { KonvaEventObject } from 'konva/lib/Node';
import { Socket } from 'socket.io-client';
import { NOBODY } from '@utils/constants';

const socketApi = {
	enterBoardPage: (socket: Socket) => socket.emit('join board page'),
	leaveBoardPage: (socket: Socket) => socket.emit('leave board page'),
	createNewPostit: (socket: Socket, newPostit: ICreatePostit) => socket.emit('create new postit', newPostit),
	updateStartPostit: (socket: Socket, targetId: number, userId: number) =>
		socket.emit('update start postit', { id: targetId, whoIsUpdating: userId }),
	updateEndPostit: (socket: Socket, newPostit: IUpdatePostit) =>
		socket.emit('update end postit', { ...newPostit, whoIsUpdating: NOBODY }),
	deletePostit: (socket: Socket, targetId: number) => socket.emit('delete postit', targetId),
	dragPostit: (socket: Socket, e: KonvaEventObject<DragEvent>, userId: number) => {
		const id = e.target.id();
		const x = e.target.x() / window.innerWidth;
		const y = e.target.y() / window.innerHeight;
		const whoIsDragging = userId;
		socket.emit('drag postit', { id, x, y, whoIsDragging });
	},
	dragEndPostit: (socket: Socket, e: KonvaEventObject<DragEvent>) => {
		const id = e.target.id();
		const x = e.target.x() / window.innerWidth;
		const y = e.target.y() / window.innerHeight;
		const whoIsDragging = NOBODY;
		socket.emit('drag end postit', { id, x, y, whoIsDragging });
	},
};

export default socketApi;
