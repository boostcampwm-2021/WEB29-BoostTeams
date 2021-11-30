import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

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
	display: flex;
	flex-direction: column;
	width: 20rem;
	background-color: ${ColorCode.WHITE};
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 8px;
	z-index: 25;
	padding: 0;
	box-sizing: border-box;
	overflow: hidden;
	input {
		border: none;
		&:focus {
			outline: none;
		}
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	border-top: 2px solid ${ColorCode.LINE1};
	button {
		width: 100%;
		height: 2.5rem;
		border: none;
		border-radius: 0;
	}
`;

export const Title = styled.span`
	width: 100%;
	height: 2rem;
	line-height: 2rem;
	font-size: 1.05rem;
	font-weight: 600;
	color: ${ColorCode.FONT1};
	text-align: center;
	border-bottom: 2px solid ${ColorCode.LINE1};
`;
