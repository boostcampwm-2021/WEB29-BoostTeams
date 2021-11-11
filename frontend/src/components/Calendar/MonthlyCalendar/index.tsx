import React from 'react';
import { Container } from './style';
import { DateInfoType, ScheduleType } from '../dataStructure';
import MonthHeader from './MonthHeader';
import MonthContent from './MonthContent';

interface MonthlyCalendarProps {
	dateInfo: DateInfoType;
	schedules: ScheduleType[];
	handleModalOpen: () => void;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
	dateInfo,
	schedules,
	handleModalOpen,
}: MonthlyCalendarProps) => {
	return (
		<Container>
			<MonthHeader />
			<MonthContent dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
		</Container>
	);
};

export default MonthlyCalendar;
