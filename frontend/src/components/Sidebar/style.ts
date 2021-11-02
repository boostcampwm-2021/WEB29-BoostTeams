import styled from 'styled-components';
import { ColorCode } from '../../utils/constants';

export const Container = styled.nav`
	background-color: ${ColorCode.BACKGROUND2};
	width: 300px;
	height: 100vh;
	padding: 1.5rem 0.5rem;
	box-sizing: border-box;
	text-align: left;
	& > * {
		text-decoration: none;
		color: ${ColorCode.BLACK};
	}
`;

export const TeamTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 0.5rem;
`;
