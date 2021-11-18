import React, { useEffect, useContext, useState } from 'react';
import UsersTemplate from '@templates/UsersTemplate';
import { SocketContext } from '@utils/socketContext';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
	teamId: string;
}

type Props = RouteComponentProps<MatchParams>;

const UsersPage: React.FC<Props> = ({ match }) => {
	const [isExitModalVisible, setIsExitModalVisible] = useState(false);
	const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

	const handleExitModalClose = () => setIsExitModalVisible(false);

	const handleExitModalOpen = () => {
		setIsExitModalVisible(true);
		setIsUpdateModalVisible(false);
		setIsDeleteModalVisible(false);
	};

	const handleUpdateModalClose = () => setIsUpdateModalVisible(false);

	const handleUpdateModalOpen = () => {
		setIsExitModalVisible(false);
		setIsUpdateModalVisible(true);
		setIsDeleteModalVisible(false);
	};

	const handleDeleteModalClose = () => setIsDeleteModalVisible(false);

	const handleDeleteModalOpen = () => {
		setIsExitModalVisible(false);
		setIsUpdateModalVisible(false);
		setIsDeleteModalVisible(true);
	};

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

	return (
		<UsersTemplate
			teamId={Number(match.params.teamId)}
			handleExitModalOpen={handleExitModalOpen}
			handleExitModalClose={handleExitModalClose}
			handleUpdateModalOpen={handleUpdateModalOpen}
			handleUpdateModalClose={handleUpdateModalClose}
			handleDeleteModalOpen={handleDeleteModalOpen}
			handleDeleteModalClose={handleDeleteModalClose}
			isExitModalVisible={isExitModalVisible}
			isUpdateModalVisible={isUpdateModalVisible}
			isDeleteModalVisible={isDeleteModalVisible}
		/>
	);
};

export default UsersPage;
