import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleType } from '@src/types/calendar';
import { WeekContainer } from './style';
import Day from './Day';

interface Props {
	week: number[];
	schedules: ScheduleType[];
	handleModalOpen: () => void;
}

const Week: React.FC<Props> = ({ week, schedules, handleModalOpen }) => {
	return (
		<WeekContainer>
			{week.map((day, idx) => (
				<Day key={uuidv4()} day={day} idx={idx} schedules={schedules} handleModalOpen={handleModalOpen} />
			))}
		</WeekContainer>
	);
};

export default Week;
