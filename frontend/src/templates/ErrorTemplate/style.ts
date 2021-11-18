import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	gap: 2rem;
	img {
		position: absolute;
		width: 30rem;
		z-index: 0;
		opacity: 0.2;
	}
`;

export const Title = styled.span`
	font-weight: 700;
	font-size: 10rem;
	color: ${ColorCode.FONT1};
	z-index: 10;
`;

export const SubTitle = styled.span`
	font-weight: 700;
	font-size: 2rem;
	z-index: 10;
`;

export const Text = styled.span`
	font-size: 1.5rem;
	z-index: 10;
`;

export const Button = styled.button`
	width: 15rem;
	height: 3rem;
	font-size: 1rem;
	z-index: 10;
	background-color: ${ColorCode.PRIMARY1};
	color: ${ColorCode.WHITE};
	border: none;
	border-radius: 20px;
	&:hover {
		background-color: ${ColorCode.PRIMARY2};
		color: ${ColorCode.BLACK};
	}
	transition: all 0.15s ease-in-out;
`;
