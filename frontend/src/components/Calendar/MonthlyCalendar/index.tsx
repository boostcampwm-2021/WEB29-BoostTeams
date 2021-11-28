import React from 'react';
import { DateInfoType, ScheduleType } from '@src/types/calendar';
import MonthHeader from './MonthHeader';
import MonthContent from './MonthContent';
import { Container } from './style';

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
