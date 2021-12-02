import React, { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { SocketContext } from '@utils/socketContext';
import { socketApi } from '@apis/team';
import { UserIdType } from '@src/types/team';
import UsersTemplate from '@templates/UsersTemplate';

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
			socketApi.enterChatPage(socketRef.current);
			socketApi.receiveOnlineUsers(socketRef.current, (onlineUsersData) => {
				setOnlineUsers(onlineUsersData);
			});
		}
		return () => {
			socketApi.leaveChatPage(socketRef.current);
			socketApi.offReceiveOnlineUsers(socketRef.current);
		};
	}, [socketRef.current]);

	return <UsersTemplate teamId={teamId} onlineUsers={onlineUsers} />;
};

export default UsersPage;
