import { ColorCode } from '@utils/constants';
import styled, { keyframes } from 'styled-components';

const upDownAnimation = keyframes`
	0% {
		transform: translateY(-0.5rem);
	}
	100% {
		transform: translateY(0);
	}
`;

export const Container = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	bottom: 0;
	right: 5rem;
	width: 17rem;
	height: calc(6rem + 8px);
	overflow: hidden;
	cursor: grab;
	color: ${ColorCode.PLACEHOLDER};
	&:hover {
		div {
			bottom: -4rem;
		}
	}
	svg {
		position: absolute;
		bottom: 2.5rem;
		transition: all 0.1s ease-in-out;
		animation: ${upDownAnimation} 0.5s ease-in-out infinite alternate;
	}
	font-size: 1.5rem;
`;

export const Wrapper = styled.div`
	display: flex;
	position: absolute;
	bottom: -8rem;
	width: 16rem;
	height: 10rem;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	color: ${ColorCode.FONT1};
	background-color: ${ColorCode.YELLOW};
	box-shadow: 4px -3px 8px rgba(0, 0, 0, 0.25);
	span {
		margin-bottom: 1rem;
	}
	cursor: pointer;
	transition: all 0.1s ease-in-out;
`;
