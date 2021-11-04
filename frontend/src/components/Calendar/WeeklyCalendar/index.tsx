import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import Schedule from './Schedule';
import { DateInfoType } from '../dataStructure';

interface WeeklyCalendarProps {
	dateInfo: DateInfoType;
	schedules: any[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ dateInfo, schedules }: WeeklyCalendarProps) => {
	return (
		<Container>
			<WeekHeader dateInfo={dateInfo} />
			<Schedule dateInfo={dateInfo} schedules={schedules} />
		</Container>
	);
};

export default WeeklyCalendar;
