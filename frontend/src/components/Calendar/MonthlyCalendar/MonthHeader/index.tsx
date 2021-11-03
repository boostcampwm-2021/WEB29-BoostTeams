import React from 'react';
import { DayNameWrapper } from './style';
import { WeekContainer } from '../style';

const MonthHeader: React.FC = () => {
	return (
		<WeekContainer>
			{['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
				<DayNameWrapper className={idx === 0 ? 'sunday' : ''}>{day}</DayNameWrapper>
			))}
		</WeekContainer>
	);
};

export default MonthHeader;
