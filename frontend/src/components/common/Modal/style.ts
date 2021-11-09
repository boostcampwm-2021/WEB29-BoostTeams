import styled from 'styled-components';
import { ColorCode } from '../../../utils/constants';

export const Background = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: transparent;
`;

export const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30rem;
	background-color: ${ColorCode.WHITE};
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 8px;
	z-index: 25;
	padding: 4rem 2rem 2rem 2rem;
	box-sizing: border-box;
	input {
		border: none;
		&:focus {
			outline: none;
		}
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: right;
	button {
		margin-left: 1rem;
	}
`;
