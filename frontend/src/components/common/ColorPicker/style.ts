import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Container = styled.div`
	position: relative;
	width: 1.2rem;
	height: 1.2rem;
	z-index: 30;
`;

export const ColorDropDown = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	top: 1.8rem;
	left: -0.7rem;
	width: 12rem;
	height: 2rem;
	background-color: ${ColorCode.WHITE};
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
export const ColorCircle = styled.div`
	width: 1.2rem;
	height: 1.2rem;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	cursor: pointer;
`;
