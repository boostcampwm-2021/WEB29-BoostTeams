import React from 'react';
import { Container } from './style';
import { DateInfoType } from '../dataStructure';
import MonthHeader from './MonthHeader';
import MonthContent from './MonthContent';

interface MonthlyCalendarProps {
	dateInfo: DateInfoType;
	schedules: any[];
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ dateInfo, schedules }: MonthlyCalendarProps) => {
	return (
		<Container>
			<MonthHeader />
			<MonthContent dateInfo={dateInfo} schedules={schedules} />
		</Container>
	);
};

export default MonthlyCalendar;
