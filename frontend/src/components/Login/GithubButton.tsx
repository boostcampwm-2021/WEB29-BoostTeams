import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { githubLogin } from '../../apis/auth';
import { Button } from './style';

const GithubButton: React.FC = () => {
	const githubLoginHandler = () => {
		githubLogin();
	};
	return (
		<Button onClick={githubLoginHandler}>
			<AiFillGithub />
			<span>Login with Github</span>
		</Button>
	);
};

export default GithubButton;
