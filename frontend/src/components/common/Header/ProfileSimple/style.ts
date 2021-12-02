import styled, { keyframes } from 'styled-components';
import { ColorCode } from '@utils/constants';

const dropAnimation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-0.5rem);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const ModalContainer = styled.div`
	position: absolute;
	top: 2rem;
	right: 1rem;
	display: flex;
	flex-direction: column;
	width: 25rem;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	background-color: ${ColorCode.WHITE};
	border-radius: 8px;
	z-index: 20;
	padding: 2rem 0rem 0rem 0rem;
	animation: ${dropAnimation} 0.5s ease-in-out 1;
`;

export const Container = styled.div`
	position: absolute;
	display: block;
	width: 100%;
	left: 0;
`;

export const Background = styled.div`
	position: fixed;
	top: 3rem;
	left: 0;
	display: block;
	width: 100vw;
	height: calc(100vh - 3rem);
	z-index: 15;
`;
