import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';

import { Container, BtnContainer, Input, Button, LogoWrapper } from './style';
import { githubLogin, login } from '../../apis/auth';

interface Props {
	inputEmailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputPwHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	email: string;
	pw: string;
}

const Logo: React.FC = () => {
	return (
		<LogoWrapper>
			<Link to='/'>
				<img src='logo.png' alt='logo' />
			</Link>
		</LogoWrapper>
	);
};

const Login: React.FC<Props> = ({ inputEmailHandler, inputPwHandler, email, pw }: Props) => {
	const localLoginHandler = () => {
		login({ userEmail: email, userPassword: pw });
	};
	const githubLoginHandler = () => {
		githubLogin();
	};
	return (
		<Container>
			<Logo />
			<Input type='email' placeholder='이메일을 입력' onChange={inputEmailHandler} />
			<Input type='password' placeholder='비밀번호를 입력' onChange={inputPwHandler} />
			<BtnContainer direction='column' gap='1rem'>
				<BtnContainer direction='row' gap='2rem'>
					<Button onClick={localLoginHandler}>
						<span>Login</span>
					</Button>
					<Button>
						<span>Signup</span>
					</Button>
				</BtnContainer>
				<Button onClick={githubLoginHandler}>
					<AiFillGithub />
					<span>Login with Github</span>
				</Button>
			</BtnContainer>
		</Container>
	);
};

export default Login;
