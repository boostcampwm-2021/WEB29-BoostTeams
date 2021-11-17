import React, { useEffect, useState } from 'react';
import { Header, Navbar } from '@components/common';
import UsersHeader from '@components/Users/UsersHeader';
import Users from '@src/components/Users/UserList';
import { readTeamInfo } from '@src/apis/users';
import ExitTeamModal from '@src/components/Users/ExitTeamModal';
import UpdateTeamModal from '@src/components/Users/UpdateTeamModal';
import DeleteTeamModal from '@src/components/Users/DeleteTeamModal';
import { MainContainer, ContentContainer } from './style';

interface Props {
	teamId: number;
	handleExitModalOpen: () => void;
	handleExitModalClose: () => void;
	handleUpdateModalOpen: () => void;
	handleUpdateModalClose: () => void;
	handleDeleteModalOpen: () => void;
	handleDeleteModalClose: () => void;
	isExitModalVisible: boolean;
	isUpdateModalVisible: boolean;
	isDeleteModalVisible: boolean;
}

const UsersTemplate: React.FC<Props> = ({
	teamId,
	handleExitModalOpen,
	handleExitModalClose,
	handleUpdateModalOpen,
	handleUpdateModalClose,
	handleDeleteModalOpen,
	handleDeleteModalClose,
	isExitModalVisible,
	isUpdateModalVisible,
	isDeleteModalVisible,
}) => {
	const [teamInfo, setTeamInfo] = useState({});
	const getTeam = async () => {
		const result = await readTeamInfo(teamId);
		setTeamInfo(result);
	};

	useEffect(() => {
		getTeam();
	}, []);

	return (
		<>
			<Header />
			<MainContainer>
				<Navbar />
				<ContentContainer>
					<UsersHeader teamInfo={teamInfo} />
					<Users
						teamId={teamId}
						handleExitModalOpen={handleExitModalOpen}
						handleUpdateModalOpen={handleUpdateModalOpen}
						handleDeleteModalOpen={handleDeleteModalOpen}
					/>
				</ContentContainer>
			</MainContainer>
			{isExitModalVisible && <ExitTeamModal handleModalClose={handleExitModalClose} teamId={teamId} />}
			{isUpdateModalVisible && <UpdateTeamModal handleModalClose={handleUpdateModalClose} teamId={teamId} />}
			{isDeleteModalVisible && <DeleteTeamModal handleModalClose={handleDeleteModalClose} teamId={teamId} />}
		</>
	);
};
export default UsersTemplate;
