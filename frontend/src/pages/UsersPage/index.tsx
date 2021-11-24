import React, { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { SocketContext } from '@utils/socketContext';
import UsersTemplate from '@templates/UsersTemplate';
import { UserIdType } from '@src/types/team';

interface MatchParams {
	teamId: string;
}

type Props = RouteComponentProps<MatchParams>;

const UsersPage: React.FC<Props> = ({ match }) => {
	const socketRef = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState<UserIdType[]>([]);
	const teamId = Number(match.params.teamId);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.on('online users', (data: { onlineUsers: UserIdType[] }) => {
				setOnlineUsers(data.onlineUsers);
			});
			socketRef.current.emit('enter users room');
		}
		return () => {
			socketRef.current.emit('leave users room');
			socketRef.current.off('online users');
		};
	}, [socketRef.current]);

	return <UsersTemplate teamId={teamId} onlineUsers={onlineUsers} />;
};

export default UsersPage;
