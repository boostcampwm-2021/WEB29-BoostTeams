import { ColorCode } from '@utils/constants';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2.5rem 0;
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 0 0 2rem 0;
`;

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

export const Textarea = styled.textarea`
	font-size: 0.9rem;
	width: calc(100% - 1rem);
	height: 3rem;
	font-family: 'Noto Sans KR', 'Noto Sans';
	outline: none;
	border: none;
	border-radius: 5px;
	background-color: ${ColorCode.BACKGROUND1};
	padding: 0.5rem;
`;
