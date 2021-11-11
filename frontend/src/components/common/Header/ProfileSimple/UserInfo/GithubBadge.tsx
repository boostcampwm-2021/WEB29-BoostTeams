import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { LinkContainer } from './style';

type Props = {
	github: string;
};

const GithubBadge: React.FC<Props> = ({ github }) => {
	return (
		<LinkContainer href={`https://github.com/${github}`} target='_blank' rel='noopner noreferrer nofollow'>
			<AiFillGithub />
			<span>{github}</span>
		</LinkContainer>
	);
};

export default GithubBadge;
