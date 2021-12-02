import React from 'react';
import { InputContainer, BtnContainer, GithubButton, Input, Logo, SignUpButton } from '@components/Login';
import { Container, Layout } from './style';

interface Props {
	signUpHandler: () => void;
	inputNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputEmailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputPwHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpTemplate: React.FC<Props> = ({ signUpHandler, inputNameHandler, inputEmailHandler, inputPwHandler }) => {
	return (
		<Layout>
			<Container>
				<Logo />
				<InputContainer>
					<span>이름 : </span>
					<Input type='name' placeholder='2-20자 사이의 한글, 영문자, 숫자' onChange={inputNameHandler} />
				</InputContainer>
				<InputContainer>
					<span>이메일 : </span>
					<Input type='email' placeholder='scc@boostteams.com' onChange={inputEmailHandler} />
				</InputContainer>
				<InputContainer>
					<span>비밀번호 : </span>
					<Input type='password' placeholder='8-15자 사이의 영문자, 숫자' onChange={inputPwHandler} />
				</InputContainer>
				<BtnContainer direction='column' gap='1rem'>
					<SignUpButton onClick={signUpHandler} />
					<GithubButton />
				</BtnContainer>
			</Container>
		</Layout>
	);
};
export default SignUpTemplate;
