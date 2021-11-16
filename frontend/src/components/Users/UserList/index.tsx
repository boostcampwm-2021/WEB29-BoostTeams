import React, { useState, useEffect } from 'react';
import SearchUsers from '@components/Users/UserList/SearchUsers';
import UserList from '@components/Users/UserList/UserList';
import { readTeamUsers } from '@apis/users';
import { Layout } from './style';

interface Props {
	teamId: number;
	handleModalOpen: () => void;
}

interface User {
	id: number;
	name: string;
	state: number;
}

const UsersTemplate: React.FC<Props> = ({ teamId, handleModalOpen }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState(users);

	const getUsers = async () => {
		const result = await readTeamUsers(teamId);
		const resultArr: any = [];
		result.forEach((e: any) =>
			resultArr.push({ id: e.user.user_id, name: e.user.user_name, state: e.user.user_state }),
		);
		setUsers(resultArr);
		setFilteredUsers(resultArr);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const handleInput = (e: any) => {
		e.preventDefault();
		setFilteredUsers(
			users.filter((elem: User) => elem.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1),
		);
	};
	return (
		<Layout>
			<SearchUsers handleInput={handleInput} handleModalOpen={handleModalOpen} />
			<UserList users={filteredUsers} />
		</Layout>
	);
};
export default UsersTemplate;
