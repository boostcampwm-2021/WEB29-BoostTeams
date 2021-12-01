import React, { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { SocketContext } from '@utils/socketContext';
import userState from '@stores/user';

import { Layout } from '@src/components/common';
import ChatPage from '@pages/ChatPage';
import CalendarPage from '@pages/CalendarPage';
import UsersPage from '@pages/UsersPage';
import BoardPage from '@pages/BoardPage';
import PrivateRoute from './PrivateRoute';

const TeamRoute = ({ computedMatch }: any) => {
	const { teamId } = computedMatch.params;
	const userId = useRecoilValue(userState).id;
	const socketRef = useRef<Socket>();

	useEffect(() => {
		if (userId !== -1) {
			socketRef.current = io(`${process.env.REACT_APP_SERVER}/socket/team-${teamId}`, { transports: ['websocket'] });
			socketRef.current.emit('change status to online', { teamId, userId });
		}
		return () => {
			socketRef.current?.disconnect();
		};
	}, [teamId, userId]);

	return (
		<Layout>
			<SocketContext.Provider value={socketRef}>
				<PrivateRoute exact path='/team/:teamId/chat' component={ChatPage} />
				<PrivateRoute exact path='/team/:teamId/calendar' component={CalendarPage} />
				<PrivateRoute exact path='/team/:teamId/users' component={UsersPage} teamId={teamId} />
				<PrivateRoute exact path='/team/:teamId/board' component={BoardPage} teamId={teamId} />
			</SocketContext.Provider>
		</Layout>
	);
};

export default TeamRoute;
