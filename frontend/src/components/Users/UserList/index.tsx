import React, { useEffect, useState } from 'react';
import SearchUsers from '@components/Users/UserList/SearchUsers';
import UserList from '@components/Users/UserList/UserList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState, teamUsersSelector } from '@stores/team';
import { TeamUserType } from '@src/types/team';
import userState from '@stores/user';
import { Layout } from './style';

interface Props {
	teamId: number;
	onlineUsers: { userId: number }[];
}

const UserListIndex: React.FC<Props> = ({ teamId, onlineUsers }) => {
	const myInfo = useRecoilValue(userState);
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const teamUserList: TeamUserType[] = Object.values(teamUsers);
	const [filteredUsers, setFilteredUsers] = useState<TeamUserType[]>([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const checkAdmin = () => teamUserList.find((user) => user.userId === myInfo.id)?.role === '관리자' || false;
	const search = (value: string) =>
		teamUserList.filter((user) => user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
	const handleInput = (e: any) => setFilteredUsers(search(e.target.value));

	const setModal = useSetRecoilState(modalState);
	const openModal = (mode: string) => setModal({ isOpen: true, mode });

	useEffect(() => {
		setFilteredUsers(teamUserList);
	}, [teamUsers]);

	useEffect(() => {
		if (myInfo.id !== -1) setIsAdmin(checkAdmin());
	}, [myInfo]);

	return (
		<Layout>
			<SearchUsers handleInput={handleInput} openModal={openModal} isAdmin={isAdmin} />
			<UserList
				users={filteredUsers}
				onlineUsers={onlineUsers}
				isAdmin={isAdmin}
				teamId={teamId}
				openModal={openModal}
			/>
		</Layout>
	);
};
export default UserListIndex;
