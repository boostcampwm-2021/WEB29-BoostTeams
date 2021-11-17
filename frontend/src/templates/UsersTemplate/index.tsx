import React, { useEffect, useState } from 'react';
import { Header, Navbar } from '@components/common';
import UsersHeader from '@components/Users/UsersHeader';
import Users from '@src/components/Users/UserList';
import { readTeamInfo } from '@src/apis/users';
import UserModal from '@src/components/Users/UsersModal';
import { MainContainer, ContentContainer } from './style';

interface Props {
	teamId: number;
	isModalVisible: boolean;
	handleModalClose: () => void;
	handleModalOpen: () => void;
}

const UsersTemplate: React.FC<Props> = ({ teamId, handleModalOpen, handleModalClose, isModalVisible }) => {
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
					<Users teamId={teamId} handleModalOpen={handleModalOpen} />
				</ContentContainer>
			</MainContainer>
			{isModalVisible && <UserModal handleModalClose={handleModalClose} teamId={teamId} />}
		</>
	);
};
export default UsersTemplate;
