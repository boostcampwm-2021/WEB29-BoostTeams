import { ColorCode } from '@src/utils/constants';
import styled from 'styled-components';

export const Wrapper = styled.div`
	position: fixed;
	bottom: 0;
	right: 5rem;
	width: 17rem;
	max-height: calc(4.8rem + 4px);
	overflow: hidden;
`;

export const Container = styled.div`
	position: relative;
	display: flex;
	width: 16rem;
	height: 8rem;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	color: ${ColorCode.GRAY};
	background-color: ${ColorCode.YELLOW};
	box-shadow: 4px -3px 8px rgba(0, 0, 0, 0.25);
	transform: translateY(40%);
	span {
		margin-bottom: 1rem;
	}
	&:hover {
		transform: translateY(8px);
	}
	cursor: pointer;
	transition: all 0.1s ease-in-out;
`;
