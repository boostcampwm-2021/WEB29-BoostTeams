import React, { useState } from 'react';
import SearchUsers from '@components/Users/UserList/SearchUsers';
import UserList from '@components/Users/UserList/UserList';
import { Layout } from './style';

const UsersTemplate: React.FC = () => {
	const users = [
		{
			name: '강민지',
			role: '관리자',
		},
		{
			name: '이명재',
			role: '구성원',
		},
		{
			name: '이원주',
			role: '구성원',
		},
		{
			name: '장수용',
			role: '구성원',
		},
	];

	const [filteredUsers, setFilteredUsers] = useState(users);

	const handleInput = (e: any) => {
		e.preventDefault();
		setFilteredUsers(users.filter((elem) => elem.name.indexOf(e.target.value) !== -1));
	};
	return (
		<Layout>
			<SearchUsers handleInput={handleInput} />
			<UserList users={filteredUsers} />
		</Layout>
	);
};
export default UsersTemplate;
