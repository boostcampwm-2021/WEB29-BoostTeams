import React from 'react';
import styled from 'styled-components';
import Login from '../../components/Login';
import { ColorCode } from '../../utils/constants';

interface Props {
	inputEmailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputPwHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	email: string;
	pw: string;
}

const Layout = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	align-items: center;
	justify-content: center;
	background-color: ${ColorCode.PRIMARY1};
`;

const LoginTemplate: React.FC<Props> = ({ inputEmailHandler, inputPwHandler, email, pw }) => {
	return (
		<Layout>
			<Login inputEmailHandler={inputEmailHandler} inputPwHandler={inputPwHandler} email={email} pw={pw} />
		</Layout>
	);
};

export default LoginTemplate;
