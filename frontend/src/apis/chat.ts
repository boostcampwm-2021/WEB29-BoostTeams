import { UserIdType } from '@src/types/team';
import { Socket } from 'socket.io-client';

export const socketApi = {
	enterChatPage: (socket: Socket, teamId: number, userId: number) => {
		socket.emit('enter chat page', { teamId, userId });
	},
	enterChatRoom: (socket: Socket, chatRoomId: number) => {
		socket.emit('enter chat room', { chatRoomId });
	},
	sendMessage: (socket: Socket, content: string, userId: number, chatRoomId: number) => {
		socket.emit('send message', { content, userId, chatRoomId });
	},
	createChatRoom: (
		socket: Socket,
		teamId: number,
		chatRoomName: string,
		userList: UserIdType[],
		messageData: { content: string; userId: number },
	) => {
		socket.emit('create chat room', { teamId, chatRoomName, userList, messageData });
	},
	inviteUsers: (socket: Socket, teamId: number, chatRoomId: number, userList: UserIdType[]) => {
		socket.emit('invite users', { teamId, chatRoomId, userList });
	},
	exitChatRoom: (socket: Socket, chatRoomId: number, userId: number) => {
		socket.emit('exit chat room', { chatRoomId, userId });
	},
	updateChatRoomName: (socket: Socket, chatRoomId: number, chatRoomName: string) => {
		socket.emit('update chat room name', { chatRoomId, chatRoomName });
	},
};
