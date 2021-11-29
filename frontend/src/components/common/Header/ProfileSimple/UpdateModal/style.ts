import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Title = styled.span`
	font-size: 1.1rem;
	font-weight: 700;
	color: ${ColorCode.FONT1};
`;

export const Input = styled.input`
	line-height: 1.5rem;
	font-size: 0.9rem;
	width: calc(100% - 1rem);
	border-radius: 5px;
	background-color: ${ColorCode.BACKGROUND1};
	padding: 0.5rem;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const InputContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;
