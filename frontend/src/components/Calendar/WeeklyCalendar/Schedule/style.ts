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
	}
`;

export const DaysContainer = styled.div``;
