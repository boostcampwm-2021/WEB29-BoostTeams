import styled from 'styled-components';
import { ColorCode, NAVBAR } from '@utils/constants';

export const Container = styled.nav`
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: ${NAVBAR.WIDTH}rem;
	background-color: ${ColorCode.LINE1};
	overflow-y: hidden;
`;

export const BellIconWrapper = styled.div`
	padding: 0.8rem 0;
	border-bottom: solid 1px ${ColorCode.LINE2};
	svg {
		color: ${ColorCode.FONT2};
		width: 1.5rem;
		height: auto;
		padding: 0.6rem;
		cursor: pointer;
		&:hover {
			color: ${ColorCode.HOVER};
		}
	}
`;

export const TabContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: solid 1px ${ColorCode.LINE2};
	padding: 1rem 0;
	svg {
		color: ${ColorCode.FONT2};
		width: 1.5rem;
		height: auto;
		padding: 0.8rem 0.6rem;
		cursor: pointer;
		&:hover {
			color: ${ColorCode.HOVER};
		}
	}
`;

export const TeamIcon = styled.div`
	width: 2rem;
	height: 2rem;
	background-color: ${(props) => props.color || ColorCode.FONT2};
	border-radius: 20%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${ColorCode.WHITE};
`;

export const TeamIconContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.8rem 0;
	div {
		margin: 0.8rem 0;
		cursor: pointer;
		box-sizing: border-box;
		&:hover {
			border: solid 2px ${ColorCode.WHITE};
		}
	}
`;
