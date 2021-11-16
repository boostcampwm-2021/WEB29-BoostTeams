import React, { useEffect, useContext, useState } from 'react';
import UsersTemplate from '@templates/UsersTemplate';
import { SocketContext } from '@utils/socketContext';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
	teamId: string;
}

type Props = RouteComponentProps<MatchParams>;

const UsersPage: React.FC<Props> = ({ match }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const handleModalClose = () => setIsModalVisible(false);
	const handleModalOpen = () => setIsModalVisible(true);

	const socketRef = useContext(SocketContext);

	// useEffect(() => {
	// 	if (socketRef.current) {
	// 		socketRef.current.on('online users', (data: any) => {
	// 			console.log(data);
	// 		});
	// 		socketRef.current.emit('enter users room');
	// 	}
	// 	return () => {
	// 		socketRef.current.emit('leave users room');
	// 		socketRef.current.off('online users');
	// 	};
	// }, [socketRef.current]);

	return (
		<UsersTemplate
			teamId={Number(match.params.teamId)}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
			isModalVisible={isModalVisible}
		/>
	);
};

export default UsersPage;
