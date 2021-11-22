import { Socket } from 'socket.io';

const initChat = (socket: Socket) => {
	socket.on('enter chat rooms', ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			console.log(`join chat-${chatRoomId}`);
			socket.join(`chat-${chatRoomId}`);
		});
	});

	socket.on('leave chat rooms', ({ chatRooms }: { chatRooms: { chatRoomId: number }[] }) => {
		chatRooms.forEach(({ chatRoomId }) => {
			console.log(`leave chat-${chatRoomId}`);
			socket.leave(`chat-${chatRoomId}`);
		});
	});
};

export default initChat;
