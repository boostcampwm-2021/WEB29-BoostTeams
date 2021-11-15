import React from 'react';
import { Header, Navbar, Sidebar } from '@components/common';
import UsersHeader from '@components/Users/UsersHeader';
import Users from '@src/components/Users/UserList';
import { MainContainer, ContentContainer } from './style';

const UsersTemplate: React.FC = () => {
	const teamInfo = {
		teamId: 1,
		teamName: 'boostcamp web-29',
		teamDesc: '팀 성명 정보입니다.',
	};
	return (
		<div>
			<Header />
			<MainContainer>
				<Navbar />
				<Sidebar />
				<ContentContainer>
					<UsersHeader teamInfo={teamInfo} />
					<Users />
				</ContentContainer>
			</MainContainer>
		</div>
	);
};
export default UsersTemplate;
