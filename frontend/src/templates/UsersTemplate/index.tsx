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
		<>
			<Header />
			<MainContainer>
				<Navbar />
				<ContentContainer>
					<UsersHeader teamInfo={teamInfo} />
					<Users />
				</ContentContainer>
			</MainContainer>
		</>
	);
};
export default UsersTemplate;
