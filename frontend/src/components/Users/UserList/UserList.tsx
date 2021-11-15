import React from 'react';
import { LabelContainer, UserWrapper, Container } from './style';

interface Props {
	users: any[];
}

const UsersList: React.FC<Props> = ({ users }) => {
	const managerUsers = users.filter((e) => e.role === '관리자');
	const normalUsers = users.filter((e) => e.role !== '관리자');
	return (
		<Container>
			<div>소유자</div>
			<LabelContainer>
				<div>이름</div>
				<div>역할</div>
			</LabelContainer>
			{managerUsers.map((e) => (
				<UserWrapper>
					<div>{e.name}</div>
					<div>{e.role}</div>
				</UserWrapper>
			))}
			<div>구성원</div>
			<LabelContainer>
				<div>이름</div>
				<div>역할</div>
			</LabelContainer>
			{normalUsers.map((e) => (
				<UserWrapper>
					<div>{e.name}</div>
					<div>{e.role}</div>
				</UserWrapper>
			))}
		</Container>
	);
};

export default UsersList;
