import styled, { keyframes } from 'styled-components';
import { ColorCode, Font } from '@utils/constants';

const dropDownAnimation = keyframes`
	0% {
		transform: scaleY(0);
	}
	80% {
		transform: scaleY(1.1);
	}
	100% {
		transform: scaleY(1);
	}
`;

export const Container = styled.div`
	font-size: ${Font.SMALL};
	position: relative;
	display: inline-block;
	div {
		span {
			font-weight: bold;
			cursor: pointer;
		}
		svg {
			margin-left: 0.2rem;
			cursor: pointer;
		}
	}
`;

export const OptionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 1.5rem;
	left: -1rem;
	background-color: ${ColorCode.WHITE};
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	z-index: 25;
	overflow: hidden;
	div {
		padding: 0.7rem 1rem;
		white-space: nowrap;
		:hover {
			cursor: pointer;
			background-color: ${ColorCode.LINE1};
		}
	}
	animation: ${dropDownAnimation} 0.3s ease-in-out forwards;
	transform-origin: top center;
`;

export const Background = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 20;
	cursor: default;
`;
