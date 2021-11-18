import React from 'react';
import SearchUsers from '@components/Users/UserList/SearchUsers';
import UserList from '@components/Users/UserList/UserList';
import { Layout } from './style';

interface Props {
	teamId: number;
	isAdmin: boolean;
	onlineUsers: { userId: number }[];
	filteredUsers: any;
	handleInput: (e: any) => void;
	onBtnClick: (mode: string) => void;
}

const UserListIndex: React.FC<Props> = ({ teamId, isAdmin, onlineUsers, filteredUsers, handleInput, onBtnClick }) => {
	return (
		<Layout>
			<SearchUsers handleInput={handleInput} onBtnClick={onBtnClick} isAdmin={isAdmin} />
			<UserList
				users={filteredUsers}
				isAdmin={isAdmin}
				onlineUsers={onlineUsers}
				teamId={teamId}
				onBtnClick={onBtnClick}
			/>
		</Layout>
	);
};
export default UserListIndex;
