import React from 'react';
import SearchUsers from '@components/Users/UserList/SearchUsers';
import UserList from '@components/Users/UserList/UserList';
import { useSetRecoilState } from 'recoil';
import { modalState } from '@src/stores/team';
import { Layout } from './style';

interface Props {
	teamId: number;
	isAdmin: boolean;
	onlineUsers: { userId: number }[];
	filteredUsers: any;
	handleInput: (e: any) => void;
}

const UserListIndex: React.FC<Props> = ({ teamId, isAdmin, onlineUsers, filteredUsers, handleInput }) => {
	const setModal = useSetRecoilState<any>(modalState);
	const openModal = (mode: string) => setModal({ isOpen: true, mode });
	return (
		<Layout>
			<SearchUsers handleInput={handleInput} openModal={openModal} isAdmin={isAdmin} />
			<UserList
				users={filteredUsers}
				isAdmin={isAdmin}
				onlineUsers={onlineUsers}
				teamId={teamId}
				openModal={openModal}
			/>
		</Layout>
	);
};
export default UserListIndex;
