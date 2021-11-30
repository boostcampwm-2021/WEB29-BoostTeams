import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { LinkContainer } from './style';

type Props = {
	github_id: string;
	github_name: string | undefined;
};

const GithubBadge: React.FC<Props> = ({ github_id, github_name }) => {
	return (
		<LinkContainer href={`https://github.com/${github_id}`} target='_blank' rel='noopner noreferrer nofollow'>
			<FaGithub />
			<span>{github_name}</span>
		</LinkContainer>
	);
};

export default GithubBadge;
