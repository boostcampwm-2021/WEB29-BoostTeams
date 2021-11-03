import React from 'react';
import { Container } from './style';
import { DateInfoType } from '../dataStructure';
import MonthHeader from './MonthHeader';
import MonthContent from './MonthContent';

interface MonthlyCalendarProps {
	dateInfo: DateInfoType;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ dateInfo }: MonthlyCalendarProps) => {
	return (
		<Container>
			<MonthHeader />
			<MonthContent dateInfo={dateInfo} />
		</Container>
	);
};

export default MonthlyCalendar;
