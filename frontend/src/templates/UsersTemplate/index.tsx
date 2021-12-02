import React from 'react';
import UsersHeader from '@components/Users/UsersHeader';
import UserList from '@components/Users/UserList';
import {
	ExitTeamModal,
	UpdateTeamModal,
	DeleteTeamModal,
	KickoutTeamModal,
	InviteUserModal,
} from '@components/Users/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '@stores/team';
import { ContentContainer } from './style';

interface Props {
	teamId: number;
	onlineUsers: { userId: number }[];
}

const UsersTemplate: React.FC<Props> = ({ teamId, onlineUsers }) => {
	const [modal, setModal] = useRecoilState<any>(modalState);
	const closeModal = () => setModal({ isOpen: false, mode: modal.mode });
	return (
		<>
			<ContentContainer>
				<UsersHeader teamId={teamId} />
				<UserList teamId={teamId} onlineUsers={onlineUsers} />
			</ContentContainer>
			{modal.mode === 'EXIT' && modal.isOpen && <ExitTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'UPDATE' && modal.isOpen && <UpdateTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'DELETE' && modal.isOpen && <DeleteTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'KICKOUT' && modal.isOpen && <KickoutTeamModal handleModalClose={closeModal} teamId={teamId} />}
			{modal.mode === 'INVITE' && modal.isOpen && <InviteUserModal handleModalClose={closeModal} teamId={teamId} />}
		</>
	);
};
export default UsersTemplate;
