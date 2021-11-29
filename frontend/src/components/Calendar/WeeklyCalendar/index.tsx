import React from 'react';
import { DateInfoType, ScheduleType } from '@src/types/calendar';
import WeekHeader from './WeekHeader';
import WeekContent from './WeekContent';
import { Container } from './style';

interface Props {
	dateInfo: DateInfoType;
	schedules: ScheduleType[];
	handleModalOpen: () => void;
}

const WeeklyCalendar: React.FC<Props> = ({ dateInfo, schedules, handleModalOpen }) => {
	return (
		<Container>
			<WeekHeader dateInfo={dateInfo} />
			<WeekContent dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
		</Container>
	);
};

export default WeeklyCalendar;
