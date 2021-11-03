import styled from 'styled-components';
import { ColorCode } from '../../../../utils/constants';

export const DayNameWrapper = styled.div`
	height: 2rem;
	border-left: 1px solid ${ColorCode.LINE2};
	border-bottom: 1px solid ${ColorCode.LINE2};
	background-color: ${ColorCode.BACKGROUND2};
	display: flex;
	align-items: center;
	&.sunday {
		color: ${ColorCode.RED};
	}
`;
