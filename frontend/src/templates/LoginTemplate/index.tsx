import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, Input, BtnContainer, GithubButton, LoginButton, SignUpButton } from '@components/Login';
import { Container, Layout } from './style';

interface Props {
	localLoginHandler: () => void;
	inputEmailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputPwHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginTemplate: React.FC<Props> = ({ localLoginHandler, inputEmailHandler, inputPwHandler }) => {
	return (
		<Layout>
			<Container>
				<Logo />
				<Input type='email' placeholder='이메일을 입력' onChange={inputEmailHandler} />
				<Input type='password' placeholder='비밀번호를 입력' onChange={inputPwHandler} />
				<BtnContainer direction='column' gap='1rem'>
					<BtnContainer direction='row' gap='2rem'>
						<LoginButton localLoginHandler={localLoginHandler} />
						<Link to='/signup'>
							<SignUpButton />
						</Link>
					</BtnContainer>
					<GithubButton />
				</BtnContainer>
			</Container>
		</Layout>
	);
};

export default LoginTemplate;
