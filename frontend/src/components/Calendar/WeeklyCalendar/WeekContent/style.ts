import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

interface CurrTimeLineProps {
	start: number;
}

interface DayContainerProps {
	focus: boolean;
}

export const Container = styled.div`
	display: flex;
	background-color: ${ColorCode.BACKGROUND1};
	overflow-y: scroll;
	position: absolute;
	top: 4rem;
	left: 0;
	right: 0;
	bottom: 0;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const TimeContainer = styled.div`
	width: 4.5rem;
	div {
		height: 5rem;
		padding-top: 0.3rem;
		font-size: 0.8rem;
		color: ${ColorCode.FONT1};
		text-align: center;
		box-sizing: border-box;
	}
`;

export const DaysContainer = styled.div`
	position: relative;
	flex-grow: 1;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

export const DayContainer = styled.div<DayContainerProps>`
	position: relative;
	flex-grow: 1;
	border-left: solid 1px ${ColorCode.LINE2};
	background-color: ${(props) => `${props.focus ? ColorCode.WHITE : ''}`};
`;

export const TimeBlock = styled.div`
	box-sizing: border-box;
	height: 2.5rem;
	border-bottom: solid 1px ${ColorCode.LINE2};
	border-collapse: collapse;
	&:hover {
		background-color: ${ColorCode.LINE1};
	}
`;

export const CurrTimeLine = styled.hr<CurrTimeLineProps>`
	position: absolute;
	top: ${(props) => `${(props.start * 2.5).toString()}rem`};
	left: 4.5rem;
	border-width: 1px 0 0 0;
	border-color: ${ColorCode.RED};
	border-style: dashed;
	width: 100%;
	margin: 0;
	z-index: 10;
`;
