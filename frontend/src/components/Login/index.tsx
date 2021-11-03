import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';

import { Container, BtnContainer, Input, Button, LogoWrapper } from './style';
import { githubLogin, login } from '../../apis/auth';

import UserState from '../../stores/user';

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
	const history = useHistory();
	const setUser = useSetRecoilState(UserState);
	const localLoginHandler = async () => {
		const user: any = await login({ userEmail: email, userPassword: pw });
		if (user) {
			setUser({ name: user?.user_name, email: user?.user_email, state: user?.user_state });
			history.push('/team');
		}
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
