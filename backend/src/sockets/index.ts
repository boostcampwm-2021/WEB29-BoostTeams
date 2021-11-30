import { Namespace, Socket } from 'socket.io';
import initTeam from './events/team';
import initBoard from './events/board';
import initChat from './events/chat';

const socketInit = (namespace: Namespace): void => {
	namespace.on('connect', (socket: Socket) => {
		initTeam(socket);
		initBoard(socket);
		initChat(socket, namespace);
	});
};

export default socketInit;
