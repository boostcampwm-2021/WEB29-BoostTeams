import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import WeekContent from './WeekContent';
import { DateInfoType } from '../dataStructure';

interface WeeklyCalendarProps {
	dateInfo: DateInfoType;
	schedules: any[];
	handleModalOpen: () => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
	dateInfo,
	schedules,
	handleModalOpen,
}: WeeklyCalendarProps) => {
	return (
		<Container>
			<WeekHeader dateInfo={dateInfo} />
			<WeekContent dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
		</Container>
	);
};

export default WeeklyCalendar;
