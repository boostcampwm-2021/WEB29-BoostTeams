import styled from 'styled-components';
import { ColorCode } from '../../../../utils/constants';

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
