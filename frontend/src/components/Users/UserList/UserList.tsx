import React from 'react';
import { LabelContainer, UserWrapper, Container } from './style';

interface Props {
	users: any[];
}

const UsersList: React.FC<Props> = ({ users }) => {
	const managerUsers: any[] = [];
	const normalUsers: any[] = [];
	users.forEach((e) => {
		if (e.role === '관리자') managerUsers.push(e);
		else normalUsers.push(e);
	});
	return (
		<Container>
			<div>소유자</div>
			<LabelContainer>
				<span>이름</span>
				<span>역할</span>
			</LabelContainer>
			{managerUsers.map((e) => (
				<UserWrapper key={e.id}>
					<span>
						<span>{e.state}</span>
						<span>{e.name}</span>
					</span>
					<span>{e.role}</span>
				</UserWrapper>
			))}
			<div>구성원</div>
			<LabelContainer>
				<span>이름</span>
				<span>역할</span>
			</LabelContainer>
			{normalUsers.map((e) => (
				<UserWrapper key={e.id}>
					<span>
						<span>{e.state}</span>
						<span>{e.name}</span>
					</span>
					<span>{e.role}</span>
				</UserWrapper>
			))}
		</Container>
	);
};

export default UsersList;
