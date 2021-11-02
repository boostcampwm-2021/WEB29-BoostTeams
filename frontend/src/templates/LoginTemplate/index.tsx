import React from 'react';
import styled from 'styled-components';
import Login from '../../components/Login';
import { ColorCode } from '../../utils/constants';

const Layout = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	align-items: center;
	justify-content: center;
	background-color: ${ColorCode.PRIMARY1};
`;

const LoginTemplate: React.FC = () => {
	return (
		<Layout>
			<Login />
		</Layout>
	);
};
export default LoginTemplate;
