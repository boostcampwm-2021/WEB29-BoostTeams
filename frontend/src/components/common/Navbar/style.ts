import styled from 'styled-components';
import { ColorCode, NAVBAR } from '@utils/constants';

type Props = {
	isHere: boolean;
};

export const Container = styled.nav`
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: ${NAVBAR.WIDTH}px;
	height: 100%;
	background-color: ${ColorCode.LINE1};
	overflow-y: hidden;
`;

export const IconWrapper = styled('div')<Props>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	&:hover {
		background-color: ${ColorCode.LINE2};
		svg {
			color: ${ColorCode.HOVER};
		}
	}
	svg {
		width: 1.5rem;
		height: auto;
		cursor: pointer;
		color: ${(props) => (props.isHere ? ColorCode.HOVER : ColorCode.FONT2)};
		transition: all 0.2s ease-in-out;
	}
	transition: all 0.2s ease-in-out;
`;

export const TabContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: solid 1px ${ColorCode.LINE2};
	padding: 1rem 0;
	gap: 0.3rem;
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
