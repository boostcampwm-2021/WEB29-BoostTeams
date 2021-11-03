import styled from 'styled-components';
import { ColorCode } from '../../../utils/constants';

export const Container = styled.section`
	height: 100%;
	border-right: 1px solid ${ColorCode.LINE2};
	border-top: 1px solid ${ColorCode.LINE2};
`;

export const WeekContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: 100%;
	& > * {
		padding: 0.5rem;
	}
`;

export const DayWrapper = styled.div`
	height: 5rem;
	border-left: 1px solid ${ColorCode.LINE2};
	border-bottom: 1px solid ${ColorCode.LINE2};
	&.sunday {
		color: ${ColorCode.RED};
	}
	&:hover {
		background-color: ${ColorCode.BACKGROUND1};
	}
`;

export const Schedule = styled.div`
	height: 30%;
	border: 1px solid ${ColorCode.LINE2};
	border-radius: 2px;
	background-color: ${(props) => props.color || ColorCode.WHITE};
	color: black;
	padding: 0.2rem;
`;
