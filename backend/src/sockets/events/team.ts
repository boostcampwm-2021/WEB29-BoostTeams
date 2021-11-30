import { Socket } from 'socket.io';
import { teamEvents } from '../eventType';
import teamHandler from '@sockets/handlers/team';

const initTeam = (socket: Socket): void => {
	socket.on(teamEvents.ENTER_USERS_PAGE, () => teamHandler.enterUsersPage(socket));
	socket.on(teamEvents.LEAVE_USERS_PAGE, () => teamHandler.leaveUsersPage(socket));
	socket.on(teamEvents.CHANGE_STATUS_TO_ONLINE, (data) => teamHandler.changeStatusToOnline(socket, data));
	socket.on(teamEvents.DISCONNECT, () => teamHandler.disconnect(socket));
};

export default initTeam;
