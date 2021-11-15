import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Layout = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	align-items: center;
	justify-content: center;
	background-color: ${ColorCode.PRIMARY1};
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 13rem;
	height: 23rem;
	padding: 3rem 5rem 5rem 5rem;
	background-color: ${ColorCode.BACKGROUND1};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
`;
