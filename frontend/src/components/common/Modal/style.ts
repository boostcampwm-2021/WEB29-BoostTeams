import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Background = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 25;
	background-color: rgba(0, 0, 0, 0.2);
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
	resize: none;
	height: 3rem;
	font-family: 'Noto Sans KR', 'Noto Sans';
	outline: none;
	border: none;
	border-radius: 5px;
	background-color: ${ColorCode.BACKGROUND1};
	padding: 0.5rem;
`;
