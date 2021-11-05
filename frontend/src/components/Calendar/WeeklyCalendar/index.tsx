import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import WeekContent from './WeekContent';
import { DateInfoType } from '../dataStructure';

interface WeeklyCalendarProps {
	dateInfo: DateInfoType;
	schedules: any[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ dateInfo, schedules }: WeeklyCalendarProps) => {
	return (
		<Container>
			<WeekHeader dateInfo={dateInfo} />
			<WeekContent dateInfo={dateInfo} schedules={schedules} />
		</Container>
	);
};

export default WeeklyCalendar;
