import React from 'react';
import { DayNameWrapper, WeekNameContainer } from './style';

const MonthHeader: React.FC = () => {
	return (
		<WeekNameContainer>
			{['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
				<DayNameWrapper key={day} className={idx === 0 ? 'sunday' : ''}>
					{day}
				</DayNameWrapper>
			))}
		</WeekNameContainer>
	);
};

export default MonthHeader;
