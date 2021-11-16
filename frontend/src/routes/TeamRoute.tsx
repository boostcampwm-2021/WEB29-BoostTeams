import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { SocketContext } from '@utils/socketContext';
import UserState from '@stores/user';

import ChatPage from '@pages/ChatPage';
import CalendarPage from '@pages/CalendarPage';
import UsersPage from '@pages/UsersPage';
import PrivateRoute from './PrivateRoute';

const TeamRoute = ({ computedMatch }: any) => {
	const { teamId } = computedMatch.params;
	const userEmail = useRecoilValue(UserState).email;
	const socketRef = useRef<Socket>();

	useEffect(() => {
		if (userEmail) {
			socketRef.current = io(`${process.env.REACT_APP_SERVER}/team-${teamId}`);
			socketRef.current.emit('change status to online', { teamId, userId: userEmail });
		}
		return () => {
			socketRef.current?.disconnect();
		};
	}, [teamId, userEmail]);

	return (
		<SocketContext.Provider value={socketRef}>
			<PrivateRoute exact path='/team/:teamId/chat' component={ChatPage} />
			<PrivateRoute exact path='/team/:teamId/calendar' component={CalendarPage} />
			<PrivateRoute exact path='/team/:teamId/users' component={UsersPage} teamId={teamId} />
		</SocketContext.Provider>
	);
};

export default TeamRoute;
