import React from 'react';
import { Header, Navbar } from '@components/common';
import UsersHeader from '@components/Users/UsersHeader';
import Users from '@src/components/Users/UserList';
import {
	ExitTeamModal,
	UpdateTeamModal,
	DeleteTeamModal,
	KickoutTeamModal,
	InviteUserModal,
} from '@components/Users/Modal';
import { MainContainer, ContentContainer } from './style';

interface Props {
	teamId: number;
	onlineUsers: { userId: number }[];
	mode: string | null;
	isModalOpen: boolean;
	closeModal: () => void;
	teamInfo: any;
	getTeam: () => void;
	filteredUsers: any;
	handleInput: (e: any) => void;
	onBtnClick: (mode: string) => void;
	isAdmin: boolean;
	deleteUserById: (id: number) => void;
}

const UsersTemplate: React.FC<Props> = ({
	teamId,
	onlineUsers,
	filteredUsers,
	isAdmin,
	mode,
	isModalOpen,
	closeModal,
	teamInfo,
	getTeam,
	handleInput,
	onBtnClick,
	deleteUserById,
}) => {
	return (
		<>
			<Header />
			<MainContainer>
				<Navbar />
				<ContentContainer>
					<UsersHeader teamInfo={teamInfo} />
					<Users
						teamId={teamId}
						onlineUsers={onlineUsers}
						isAdmin={isAdmin}
						filteredUsers={filteredUsers}
						handleInput={handleInput}
						onBtnClick={onBtnClick}
					/>
				</ContentContainer>
			</MainContainer>
			{mode === 'EXIT' && isModalOpen && <ExitTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{mode === 'UPDATE' && isModalOpen && (
				<UpdateTeamModal handleModalClose={closeModal} teamId={teamId} teamInfo={teamInfo} getTeam={getTeam} />
			)}
			{mode === 'DELETE' && isModalOpen && <DeleteTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{mode === 'KICKOUT' && isModalOpen && (
				<KickoutTeamModal handleModalClose={closeModal} teamId={teamId} deleteUserById={deleteUserById} />
			)}
			{mode === 'INVITE' && isModalOpen && <InviteUserModal handleModalClose={closeModal} teamId={teamId} />}
		</>
	);
};
export default UsersTemplate;
