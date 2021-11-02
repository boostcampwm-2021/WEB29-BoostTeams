import styled from 'styled-components';
import { ColorCode } from '../../../../utils/constants';

export const Container = styled.div`
	display: flex;
	background-color: ${ColorCode.BACKGROUND1};
	overflow-y: scroll;
	position: absolute;
	top: 4.5rem;
	left: 0;
	right: 0;
	bottom: 0;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const TimeContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 4rem;
	div {
		height: 5rem;
		font-size: 0.8rem;
		color: ${ColorCode.FONT1};
		padding: 0.2rem;
		padding-bottom: 4rem;
		text-align: center;
		box-sizing: border-box;
	}
`;

export const DaysContainer = styled.div`
	flex-grow: 1;
	display: flex;
	height: 4.5rem;
	align-items: center;
`;

export const DayContainer = styled.div`
	flex-grow: 1;
	border-left: solid 1px ${ColorCode.LINE2};

	div {
		box-sizing: border-box;
		height: 2.5rem;
		border-bottom: solid 1px ${ColorCode.LINE2};
		border-collapse: collapse;
		&:hover {
			background-color: ${ColorCode.LINE1};
		}
	}
`;
