import React from 'react';
import { ProfileIcon } from '@components/common';
import EmailBox from './EmailBox';
import GithubBadge from './GithubBadge';
import { Container, NameContainer, TextContainer } from './style';

type User = {
	name: string;
	email: string;
	color: number;
	github_id?: string;
	github_name?: string;
};

type ProfileProps = {
	user: User;
	status: string;
};

const TextInfo: React.FC<ProfileProps> = ({ user, status }) => {
	const { name, email, github_id, github_name } = user;
	return (
		<TextContainer>
			<NameContainer>
				<span>{name} |</span>
				{github_id && <GithubBadge github_id={github_id} github_name={github_name} />}
				{!github_id && <EmailBox email={email} />}
			</NameContainer>
			{status === 'none' && <span>Online</span>}
			{status !== 'none' && <span>대화 가능 | 상태 메시지 설정</span>}
		</TextContainer>
	);
};

const UserInfo: React.FC<ProfileProps> = ({ user, status }) => {
	const { name, color } = user;
	return (
		<Container>
			<ProfileIcon name={name} color={color} status={status} width={5} isHover={false} />
			<TextInfo user={user} status={status} />
		</Container>
	);
};

export default UserInfo;
