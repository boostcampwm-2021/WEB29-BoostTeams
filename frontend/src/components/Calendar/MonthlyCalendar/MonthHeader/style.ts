import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const WeekNameContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: 100%;
	& > * {
		padding: 0.5rem;
	}
`;

export const DayNameWrapper = styled.div`
	height: 2rem;
	border-right: 1px solid ${ColorCode.LINE2};
	border-bottom: 1px solid ${ColorCode.LINE2};
	background-color: ${ColorCode.BACKGROUND1};
	display: flex;
	align-items: center;
	&.sunday {
		color: ${ColorCode.RED};
	}
`;
