import React, { useState, useEffect } from 'react';
import SearchUsers from '@components/Users/UserList/SearchUsers';
import UserList from '@components/Users/UserList/UserList';
import { readTeamUsers } from '@apis/users';
import { Role } from '@src/utils/constants';
import { useRecoilValue } from 'recoil';
import UserState from '@src/stores/user';
import { Layout } from './style';

interface Props {
	teamId: number;
	handleExitModalOpen: () => void;
	handleUpdateModalOpen: () => void;
	handleDeleteModalOpen: () => void;
}

interface User {
	id: number;
	name: string;
	state: number;
}

const UserListIndex: React.FC<Props> = ({
	teamId,
	handleExitModalOpen,
	handleUpdateModalOpen,
	handleDeleteModalOpen,
}) => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState(users);
	const user = useRecoilValue(UserState);
	const [isAdmin, setIsAdmin] = useState(false);

	const getUsers = async () => {
		const result = await readTeamUsers(teamId);
		const resultArr: any = [];
		result.forEach((e: any) =>
			resultArr.push({
				id: e.user.user_id,
				name: e.user.user_name,
				color: e.user.user_state,
				role: Role[e.role],
				state: e.state,
			}),
		);
		setUsers(resultArr);
		setFilteredUsers(resultArr);
		setIsAdmin(checkAdmin(resultArr));
	};

	useEffect(() => {
		getUsers();
	}, []);

	const checkAdmin = (resultArr: any[]) =>
		resultArr.filter((e: any) => e.name === user.name)[0]?.role === '관리자' || false;

	const search = (e: any) =>
		users.filter((elem: User) => elem.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);

	const handleInput = (e: any) => {
		e.preventDefault();
		setFilteredUsers(search(e));
	};

	return (
		<Layout>
			<SearchUsers
				handleInput={handleInput}
				handleExitModalOpen={handleExitModalOpen}
				handleUpdateModalOpen={handleUpdateModalOpen}
				handleDeleteModalOpen={handleDeleteModalOpen}
				isAdmin={isAdmin}
			/>
			<UserList users={filteredUsers} isAdmin={isAdmin} />
		</Layout>
	);
};
export default UserListIndex;
