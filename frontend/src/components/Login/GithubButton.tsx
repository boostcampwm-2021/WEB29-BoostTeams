import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { githubLogin } from '@apis/auth';
import { Button } from './style';

const GithubButton: React.FC = () => {
	const githubLoginHandler = () => {
		githubLogin();
	};
	return (
		<Button onClick={githubLoginHandler}>
			<FaGithub />
			<span>Login with Github</span>
		</Button>
	);
};

export default GithubButton;
