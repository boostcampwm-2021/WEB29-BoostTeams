import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

interface DayContainerProps {
	focus: boolean;
}

export const Container = styled.header`
	display: flex;
	align-items: center;
	height: 4rem;
	background-color: ${ColorCode.BACKGROUND1};
	border-bottom: solid 1px ${ColorCode.LINE2};
	padding-left: 4.5rem;
	box-sizing: border-box;
`;

export const DayContainer = styled.div<DayContainerProps>`
	height: 100%;
	border-left: solid 1px ${ColorCode.LINE2};
	flex-grow: 1;
	flex-shrink: 0;
	padding: 0.5rem;
	box-sizing: border-box;
	color: ${ColorCode.FONT1};
	background-color: ${(props) => `${props.focus ? ColorCode.WHITE : ''}`};
	b {
		display: block;
		font-size: 1.5rem;
	}
	span {
		display: block;
		padding-top: 0.5rem;
		font-size: 0.8rem;
	}
`;
