import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import Schedule from './Schedule';
import { DateInfoType } from '../dataStructure';

interface WeeklyCalendarProps {
	dateInfo: DateInfoType;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ dateInfo }: WeeklyCalendarProps) => {
	return (
		<Container>
			<WeekHeader dateInfo={dateInfo} />
			<Schedule dateInfo={dateInfo} />
		</Container>
	);
};

export default WeeklyCalendar;
