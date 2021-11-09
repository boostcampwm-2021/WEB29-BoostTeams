import React from 'react';
import { ProfileIcon } from '../../..';
import { Container, TextContainer } from './style';

type User = {
	name: string;
	email: string;
	state: number;
};

type ProfileProps = {
	user: User;
	status: string;
};

const TextInfo: React.FC<ProfileProps> = ({ user, status }) => {
	const { name, email } = user;
	return (
		<TextContainer>
			<span>{name}</span>
			<span>{email}</span>
			{status === 'none' && <span>Online</span>}
			{status !== 'none' && <span>대화 가능 | 상태 메시지 설정</span>}
		</TextContainer>
	);
};

const UserInfo: React.FC<ProfileProps> = ({ user, status }) => {
	const { name } = user;
	const color = user.state;

	return (
		<Container>
			<ProfileIcon name={name} color={color} status={status} width={5} isHover={false} />
			<TextInfo user={user} status={status} />
		</Container>
	);
};

export default UserInfo;
