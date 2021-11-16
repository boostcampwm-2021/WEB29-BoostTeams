import React, { useEffect, useContext } from 'react';
import UsersTemplate from '@templates/UsersTemplate';
import { SocketContext } from '@utils/socketContext';

const UsersPage: React.FC = () => {
	const socketRef = useContext(SocketContext);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.on('online users', (data: any) => {
				console.log(data);
			});
			socketRef.current.emit('enter users room');
		}
		return () => {
			socketRef.current.emit('leave users room');
			socketRef.current.off('online users');
		};
	}, [socketRef.current]);

	return <UsersTemplate />;
};

export default UsersPage;
