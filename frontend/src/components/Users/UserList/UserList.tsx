import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import User from './User';
import { LabelContainer, UserListContainer } from './style';

interface Props {
	users: any[];
	isAdmin: boolean;
	onlineUsers: { userId: number }[];
	teamId: number;
	openModal: (mode: string) => void;
}

const UsersList: React.FC<Props> = ({ users, isAdmin, onlineUsers, teamId, openModal }) => {
	const managerUsers: any[] = [];
	const normalUsers: any[] = [];
	users.forEach((e) => {
		if (e.role === '관리자') managerUsers.push(e);
		else normalUsers.push(e);
	});

	const isOnline = (userId: number) => onlineUsers.find((user) => user.userId === userId) !== undefined;

	return (
		<UserListContainer>
			<h3>소유자</h3>
			<LabelContainer>
				<span>이름</span>
				<span>역할</span>
			</LabelContainer>
			{managerUsers.map((e) => (
				<User key={e.userId} user={e} isAdmin={isAdmin} isOnline={isOnline} openModal={openModal} teamId={teamId} />
			))}
			<h3>
				<span>구성원</span>
				{isAdmin ? <FaUserPlus onClick={() => openModal('INVITE')} /> : null}
			</h3>
			<LabelContainer>
				<span>이름</span>
				<span>역할</span>
			</LabelContainer>
			{normalUsers.map((e) => (
				<User key={e.userId} user={e} isAdmin={isAdmin} isOnline={isOnline} openModal={openModal} teamId={teamId} />
			))}
		</UserListContainer>
	);
};

export default UsersList;
