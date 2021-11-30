import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	gap: 2rem;
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

export const Title = styled.span`
	font-size: 1.1rem;
	font-weight: 700;
	color: ${ColorCode.FONT1};
`;
