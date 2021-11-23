import { ColorCode, Font } from '@utils/constants';
import styled from 'styled-components';

export const Title = styled.h2`
	width: 15rem;
	font-size: ${Font.MEDIUM};
	font-weight: bold;
	margin-bottom: 1.2rem;
`;

export const Input = styled.input`
	background-color: ${ColorCode.BACKGROUND1};
	padding: 0.5rem;
	margin-bottom: 1.2rem;
	border-radius: 8px;
	width: 26rem;
	box-sizing: border-box;
`;
