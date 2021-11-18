import React from 'react';
import Button from '@src/components/common/Button';
import { ColorCode } from '@src/utils/constants';
import { LabelContainer, UserWrapper, UserListContainer } from './style';

interface Props {
	users: any[];
	isAdmin: boolean;
}

const UsersList: React.FC<Props> = ({ users, isAdmin }) => {
	const managerUsers: any[] = [];
	const normalUsers: any[] = [];
	users.forEach((e) => {
		if (e.role === '관리자') managerUsers.push(e);
		else normalUsers.push(e);
	});

	const kickOut = () => console.log('강퇴');
	return (
		<UserListContainer>
			<b>소유자</b>
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
			<b>구성원</b>
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
					{isAdmin ? (
						<Button text='강퇴' backgroundColor={ColorCode.WHITE} fontColor={ColorCode.RED} handler={kickOut} />
					) : null}
				</UserWrapper>
			))}
		</UserListContainer>
	);
};

export default UsersList;
