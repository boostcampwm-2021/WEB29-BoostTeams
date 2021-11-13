import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import WeekContent from './WeekContent';
import { DateInfoType, ScheduleType } from '../dataStructure';

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
