import { Namespace, Socket } from 'socket.io';
import initTeam from './team';
import initTeamBoard from './teamBoard';
const socketInit = (namespace: Namespace): void => {
	namespace.on('connect', (socket: Socket) => {
		initTeam(socket);
		initTeamBoard(socket);
	});
};

export default socketInit;
