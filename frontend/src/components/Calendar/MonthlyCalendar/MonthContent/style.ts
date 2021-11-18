import styled from 'styled-components';
import { ColorCode, Font } from '@utils/constants';

interface ScheduleProps {
	onClick: () => void;
	color: string;
}

export const ContentContainer = styled.div`
	height: 100%;
`;

export const DayNum = styled.div`
	margin: 0.5rem;
`;

export const DayWrapper = styled.div`
	height: 100%;
	border-right: 1px solid ${ColorCode.LINE2};
	&.sunday {
		color: ${ColorCode.RED};
	}
	&:hover {
		background-color: ${ColorCode.BACKGROUND1};
	}
`;

export const Schedule = styled.div<ScheduleProps>`
	font-size: ${Font.SMALL};
	border-radius: 8px;
	background-color: ${(props) => props.color || ColorCode.ORANGE};
	padding: 0.5rem;
	margin: 0.3rem 0;
	color: ${ColorCode.BLACK};
	cursor: pointer;
`;

export const WeekContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: 100%;
	min-height: 16%;
	border-bottom: 1px solid ${ColorCode.LINE2};
`;
