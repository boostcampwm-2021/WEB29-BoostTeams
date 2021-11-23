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
import { useRecoilState } from 'recoil';
import { modalState } from '@src/stores/team';
import { MainContainer, ContentContainer } from './style';

interface Props {
	teamId: number;
	onlineUsers: { userId: number }[];
	filteredUsers: any;
	handleInput: (e: any) => void;
	isAdmin: boolean;
}

const UsersTemplate: React.FC<Props> = ({ teamId, onlineUsers, filteredUsers, isAdmin, handleInput }) => {
	const [modal, setModal] = useRecoilState<any>(modalState);
	const closeModal = () => setModal({ isOpen: false, mode: modal.mode });
	return (
		<>
			<Header />
			<MainContainer>
				<Navbar />
				<ContentContainer>
					<UsersHeader teamId={teamId} />
					<Users
						teamId={teamId}
						onlineUsers={onlineUsers}
						isAdmin={isAdmin}
						filteredUsers={filteredUsers}
						handleInput={handleInput}
					/>
				</ContentContainer>
			</MainContainer>
			{modal.mode === 'EXIT' && modal.isOpen && <ExitTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'UPDATE' && modal.isOpen && <UpdateTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'DELETE' && modal.isOpen && <DeleteTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'KICKOUT' && modal.isOpen && <KickoutTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'INVITE' && modal.isOpen && <InviteUserModal handleModalClose={closeModal} teamId={teamId} />}
		</>
	);
};
export default UsersTemplate;
