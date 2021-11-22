import { Namespace, Socket } from 'socket.io';
import initTeam from './team';
import initTeamBoard from './teamBoard';
import initChat from './chat';
const socketInit = (namespace: Namespace): void => {
	namespace.on('connect', (socket: Socket) => {
		initTeam(socket);
		initTeamBoard(socket);
		initChat(socket);
	});
};

export default socketInit;
